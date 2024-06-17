import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { useDocumentTitle } from '@/hooks/someHooks'
import { GameStyle } from './style'
import dog from '@/assets/images/dog.png'
interface IProps {
  children?: ReactNode
}
const CANVAS_WIDTH = 600
const CANVAS_HEIGHT = 600
const spriteWidth = 575
const spriteHeight = 523
const staggerFrames = 5
const animationStates = [
  {
    name: 'idle',
    frames: 7
  },
  {
    name: 'jump',
    frames: 7
  },
  {
    name: 'fall',
    frames: 7
  },
  {
    name: 'run',
    frames: 9
  },
  {
    name: 'dizzy',
    frames: 11
  },
  {
    name: 'sit',
    frames: 5
  },
  {
    name: 'roll',
    frames: 7
  },
  {
    name: 'bite',
    frames: 7
  },
  {
    name: 'ko',
    frames: 12
  },
  {
    name: 'getHit',
    frames: 4
  }
]

const GameDong: FC<IProps> = (props) => {
  useDocumentTitle('GameDong')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lastRenderTime = useRef(0)
  const [frameX, setFrameX] = useState(0)
  const [frameY, setFrameY] = useState(0)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [gameFrame, setGameFrame] = useState(0)
  const [playerImage, setPlayerImage] = useState<HTMLImageElement | null>(null)
  const [spriteAnimations, setSpriteAnimations] = useState<any>({})
  const [playState, setPlayState] = useState<'idle' | 'jump' | 'fall' | 'run' | 'dizzy' | 'sit' | 'roll' | 'bite' | 'ko' | 'getHit'>('jump')
  const animate = useCallback(() => {
    const timestamp = performance.now()
    if (!isImageLoaded || !canvasRef.current || !playerImage) return

    lastRenderTime.current = timestamp

    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playState].loc.length
    const frames = spriteAnimations[playState]?.loc || []
    const frameCount = frames.length
    const frameIndex = (gameFrame % (frameCount * staggerFrames)) / staggerFrames
    const currentFrame = frames[Math.floor(frameIndex) % frameCount]

    let nextFrameY = spriteAnimations['idle'].loc[position].y
    // 使用更新函数来确保状态更新的原子性
    let nextFrameX = position * spriteWidth

    // 判断是否需要更新
    setGameFrame(gameFrame + 1)
    setFrameX(currentFrame.x) // 使用状态更新
    setFrameY(currentFrame.y)
    ctx.drawImage(playerImage, nextFrameX, nextFrameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight)

    // 请求下一帧动画
    const animationId = window.requestAnimationFrame(animate)
    return () => {
      window.cancelAnimationFrame(animationId)
    }
  }, [isImageLoaded, playerImage, frameX, frameY, gameFrame, playState, spriteAnimations])
  useEffect(() => {
    // 保存动画ID
    let animationId: any = null
    const startAnimation = () => {
      animationId = window.requestAnimationFrame(animate)
    }

    // 组件渲染后初始化动画
    startAnimation()

    // 组件卸载时清除动画
    return () => {
      animationId && cancelAnimationFrame(animationId)
      lastRenderTime.current = 0
    }
  }, [animate]) // 仅当 animate 函数更新时重新运行
  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setPlayerImage(img)
      setIsImageLoaded(true)
    }
    img.src = dog
  }, [dog])

  useEffect(() => {
    const _spriteAnimations = animationStates.reduce((acc: any, state, index) => {
      const frames = Array.from({ length: state.frames }, (v, j) => ({
        x: j * spriteWidth,
        y: index * spriteHeight // 使用当前状态的索引来计算 y 坐标
      }))
      acc[state.name] = {
        loc: frames
      }
      return acc
    }, {})

    setSpriteAnimations(_spriteAnimations)
  }, [])
  return (
    <GameStyle>
      <select
        name=""
        id=""
        onChange={(e: any) => {
          setPlayState(e.target.value)
          setGameFrame(0)
        }}
      >
        <option value="idle">idle</option>
        <option value="jump">jump</option>
        <option value="fall">fall</option>
        <option value="run">run</option>
      </select>
      <div className="game">
        <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} style={{ border: '1px solid black' }} />
      </div>
    </GameStyle>
  )
}

export default memo(GameDong)

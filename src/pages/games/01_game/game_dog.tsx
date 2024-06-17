import React, { useRef, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import dog from '@/assets/images/dog.png'
import { GameStyle } from './style'
import { useDocumentTitle } from '@/hooks/someHooks'
import { animationStates, CANVAS_HEIGHT, CANVAS_WIDTH, spriteHeight, spriteWidth, staggerFrames } from './animationsConst'
interface IProps {
  children?: ReactNode
}

const Game: FC<IProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [playerState, setPlayerState] = useState('run')
  // const [gameFrame, setGameFrame] = useState(0)
  const [spriteAnimations, setSpriteAnimations] = useState<any>({})
  const gameFrameRef = useRef(0)
  useDocumentTitle('GameDong')
  // 初始化 spriteAnimations 的 useEffect
  useEffect(() => {
    const _spriteAnimations = animationStates.reduce((acc: any, state, index) => {
      const frames = Array.from({ length: state.frames }, (v, j) => ({
        x: j * spriteWidth,
        y: index * spriteHeight
      }))
      acc[state.name] = frames
      return acc
    }, {})

    setSpriteAnimations(_spriteAnimations)
  }, [])

  // 处理动画的 useEffect
  useEffect(() => {
    // 添加 dog 到依赖数组，确保图片地址变化时能重新加载
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx) return

    const playerImage = new Image()
    playerImage.src = dog

    let animationId: number | null = null

    const animate = () => {
      if (!ctx || !playerImage.complete || !spriteAnimations[playerState]) {
        animationId = requestAnimationFrame(animate) // 图片未加载完成或动画对象未定义，继续请求帧
        return
      }

      const frames = spriteAnimations[playerState]
      if (!frames) return // 如果当前动画状态没有帧数据，跳过绘制

      // 计算当前帧的索引

      const frameIndex = Math.floor(gameFrameRef.current / staggerFrames) % frames.length
      const frame = frames[Math.floor(frameIndex)]

      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      if (frame) {
        // 确保 frame 存在
        ctx.drawImage(playerImage, frame.x, frame.y, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight)
      }

      // setGameFrame((prevFrame) => (prevFrame + 1) % (frames.length * staggerFrames))
      gameFrameRef.current++
      animationId = requestAnimationFrame(animate)
    }

    playerImage.onload = () => {
      animate()
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [playerState, spriteAnimations, dog])
  const handleAnimationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPlayerState(e.target.value)
    // setGameFrame(0) // 重置帧数以开始新动画
    gameFrameRef.current = 0 // 重置帧数以开始新动画
  }

  return (
    <GameStyle>
      <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} style={{ border: '1px solid black' }} />
      <div className="controls">
        <label htmlFor="animations">choose animation:</label>
        <select id="animations" name="animations" value={playerState} onChange={handleAnimationChange}>
          {animationStates.map((state) => (
            <option key={state.name} value={state.name}>
              {state.name}
            </option>
          ))}
        </select>
      </div>
    </GameStyle>
  )
}

export default Game

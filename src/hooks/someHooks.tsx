import { useEffect } from 'react'

export const useDocumentTitle = (title: string, defaultTitle: string = 'Default Title') => {
  useEffect(() => {
    // 保存当前的文档标题，以便可以在组件卸载时恢复
    const originalTitle = document.title

    // 更新文档标题
    document.title = title

    // 组件卸载时恢复原始标题
    return () => {
      document.title = originalTitle
    }
  }, [title]) // 仅在title变化时更新
}

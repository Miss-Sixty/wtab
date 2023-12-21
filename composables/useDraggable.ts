import { isClient } from '@vueuse/shared'

const defaultWindow = /* #__PURE__ */ isClient ? window : undefined

export interface Position {
  x: number
  y: number
}

export interface UseDraggableOptions {
  /**
   * Element to attach `pointermove` and `pointerup` events to.
   *
   * @default window
   */
  draggingElement?: MaybeRefOrGetter<HTMLElement | SVGElement | Window | Document | null | undefined>

  /**
   * Callback when the dragging starts. Return `false` to prevent dragging.
   */
  onStart?: (position: Position, event: PointerEvent) => void | false

  /**
   * Callback during dragging.
   */
  onMove?: (position: Position, event: PointerEvent) => void

  /**
   * Callback when dragging end.
   */
  onEnd?: (position: Position, event: PointerEvent) => void

  /**
   *  @default undefined
   */
  relativeElement?: MaybeRefOrGetter<HTMLElement | SVGElement | null | undefined>
}

export default function useDraggable(
  options: UseDraggableOptions = {},
) {
  const { draggingElement = defaultWindow, relativeElement, onMove, onEnd, onStart } = options
  const pressedDelta = ref<Position>()
  const position = ref<Position>({ x: 0, y: 0 })
  const start = (dom: HTMLElement, e: PointerEvent) => {
    if (!dom)
      return
    // 阻止冒泡
    e.stopPropagation()
    const relative = toValue(relativeElement)

    const { x = 0, y = 0 } = relative?.getBoundingClientRect?.() || {}
    const targetRect = dom?.getBoundingClientRect()

    pressedDelta.value = { x: targetRect.x - x, y: targetRect.y - y }
    const pos = {
      x: e.clientX - targetRect.left,
      y: e.clientY - targetRect.top,
      // x: e.clientX - (relative ? targetRect.left - containerRect!.left : targetRect.left),
      // y: e.clientY - (relative ? targetRect.top - containerRect!.top : targetRect.top),
    }

    position.value = pos
    onStart?.(pos, e)
  }

  const move = (e: any) => {
    if (!pressedDelta.value)
      return
    // 阻止冒泡
    e.stopPropagation()
    const relative = toValue(relativeElement)
    const { x = 0, y = 0 } = relative?.getBoundingClientRect?.() || {}
    // const targetRect = e.target!.getBoundingClientRect()
    const { x: positionX, y: positionY } = position.value
    pressedDelta.value = { x: e.clientX - positionX - x, y: e.clientY - positionY - y }

    onMove?.(pressedDelta.value, e)
  }

  const end = (e: PointerEvent) => {
    if (!pressedDelta.value)
      return
    // 阻止冒泡
    e.stopPropagation()
    pressedDelta.value = undefined
    onEnd?.(position.value, e)
  }

  useEventListener(draggingElement, 'pointermove', move)
  useEventListener(draggingElement, 'pointerup', end)

  return {
    isDragging: computed(() => !!pressedDelta.value),
    pressedDelta,
    style: computed(
      () => ({
        transform: `translate(${pressedDelta.value?.x || 0}px, ${pressedDelta.value?.y || 0}px)`,
        x: pressedDelta.value?.x || 0,
        y: pressedDelta.value?.y || 0,
      }),
    ),
    start,
  }
}

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
   * Element for calculating bounds (If not set, it will use the event's target).
   *
   * @default undefined
   */
  containerElement?: MaybeRefOrGetter<HTMLElement | SVGElement | null | undefined>

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
   * start
   */
  onBeforeStart?: any
}

export default function useDraggable(
  options: UseDraggableOptions = {},
) {
  const { onBeforeStart, draggingElement = defaultWindow, containerElement, onMove, onEnd, onStart } = options
  const pressedDelta = ref<Position>()
  const position = ref<Position>({ x: 0, y: 0 })
  const start = (dom: HTMLElement, e: PointerEvent) => {
    if (!dom)
      return
    const container = toValue(containerElement)
    const containerRect = container?.getBoundingClientRect?.()
    const targetRect = dom?.getBoundingClientRect()

    pressedDelta.value = { x: targetRect.x, y: targetRect.y }
    const pos = {
      x: e.clientX - (container ? targetRect.left - containerRect!.left : targetRect.left),
      y: e.clientY - (container ? targetRect.top - containerRect!.top : targetRect.top),
    }

    position.value = pos
    onStart?.(pos, e)
  }

  const move = (e: PointerEvent) => {
    if (!pressedDelta.value)
      return

    const container = toValue(containerElement)
    const containerRect = container?.getBoundingClientRect?.()
    const targetRect = e.target!.getBoundingClientRect()
    let { x, y } = position.value
    x = e.clientX - x
    if (container)
      x = Math.min(Math.max(0, x), containerRect!.width - targetRect!.width)
    y = e.clientY - y
    if (container)
      y = Math.min(Math.max(0, y), containerRect!.height - targetRect!.height)
    pressedDelta.value = { x, y }
    onMove?.(pressedDelta.value, e)
  }

  const end = (e: PointerEvent) => {
    if (!pressedDelta.value)
      return
    pressedDelta.value = undefined
    onEnd?.(position.value, e)
  }

  onBeforeStart(start)
  useEventListener(draggingElement, 'pointermove', move)
  useEventListener(draggingElement, 'pointerup', end)

  return {
    isDragging: computed(() => !!pressedDelta.value),
    pressedDelta,
    style: computed(
      () => `transform: translate(${pressedDelta.value?.x || 0}px, ${pressedDelta.value?.y || 0}px)`,
    ),
  }
}

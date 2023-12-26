import {
  description$,
  descriptionSize$,
  name$,
  nameSize$,
  scope$,
  scopeSize$,
} from '../signals/settings'
import { useEffect, useRef } from 'preact/compat'

export default function FakeTexts() {
  const scopeRef = useRef<SVGTextElement>(null)
  const nameRef = useRef<SVGTextElement>(null)
  const descriptionRef = useRef<SVGTextElement>(null)

  useEffect(() => {
    if (
      scopeRef.current === null ||
      nameRef.current === null ||
      descriptionRef.current === null
    ) {
      return
    }

    const scopeBBox = scopeRef.current.getBBox()
    scopeSize$.value = { width: scopeBBox.width, height: scopeBBox.height }
    const nameBBox = nameRef.current.getBBox()
    nameSize$.value = { width: nameBBox.width, height: nameBBox.height }
    const descriptionBBox = descriptionRef.current.getBBox()
    descriptionSize$.value = {
      width: descriptionBBox.width,
      height: descriptionBBox.height,
    }
  }, [
    scopeRef.current,
    nameRef.current,
    descriptionRef.current,
    scope$.value,
    name$.value,
    description$.value,
  ])

  return (
    <>
      <text
        y={20}
        fontSize={36}
        fontWeight="bold"
        ref={scopeRef}
        visibility="hidden"
      >
        {scope$}/
      </text>
      <text fontSize={36} fontWeight="600" ref={nameRef} visibility="hidden">
        {name$}
      </text>
      <text
        fontSize={24}
        fontWeight="300"
        ref={descriptionRef}
        visibility="hidden"
      >
        {description$}
      </text>
    </>
  )
}

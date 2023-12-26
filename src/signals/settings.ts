import { computed, signal } from '@preact/signals'
import Delaunator from 'delaunator'
import { scale, mix } from 'chroma-js'
import chunk from 'lodash.chunk'

export const width$ = signal(830)
export const height$ = signal(370)
export const cellSize$ = signal(70)
export const variance$ = signal(50)
export const outputScale$ = signal(1)
export const scope$ = signal('@stouder-io')
export const scopeColor$ = signal('#fe3131')
export const scopeSize$ = signal({ width: 0, height: 0 })

export const name$ = signal('inertia-preact')
export const nameColor$ = signal('#000000')

export const nameSize$ = signal({ width: 0, height: 0 })

export const description$ = signal('The Preact adapter for Inertia.js')
export const descriptionColor$ = signal('#a9606c')
export const descriptionSize$ = signal({ width: 0, height: 0 })

export const debug$ = signal(false)
export const xColorStart$ = signal('#dcf8ff')
export const xColorEnd$ = signal('#dcf8ff')
export const yColorStart$ = signal('#dcf8ff')
export const yColorEnd$ = signal('#4b9eff')

export const viewbox$ = computed(() => `0 0 ${width$.value} ${height$.value}`)

const colCount$ = computed(() => Math.floor(width$.value / cellSize$.value) + 4)
const rowCount$ = computed(
  () => Math.floor(height$.value / cellSize$.value) + 4,
)
const pointCount$ = computed(() => colCount$.value * rowCount$.value)
const half$ = computed(() => cellSize$.value / 2)
const bleed$ = computed(() => [
  (colCount$.value * cellSize$.value - width$.value) / 2,
  (rowCount$.value * cellSize$.value - height$.value) / 2,
])
const maxJitter$ = computed(() => cellSize$.value * (variance$.value / 100))
const jitters$ = computed(() =>
  Array(2 * pointCount$.value)
    .fill(0)
    .map(() => (Math.random() - 0.5) * maxJitter$.value),
)

export const points$ = computed(() =>
  chunk(jitters$.value, 2).map(([jitterA, jitterB], i) => [
    -bleed$.value[0] +
      (i % colCount$.value) * cellSize$.value +
      half$.value +
      jitterA,
    -bleed$.value[1] +
      Math.floor(i / colCount$.value) * cellSize$.value +
      half$.value +
      jitterB,
  ]),
)

const triangles$ = computed(() => Delaunator.from(points$.value).triangles)
const xScale$ = computed(() =>
  scale([xColorStart$.value, xColorEnd$.value]).mode('lab'),
)
const yScale$ = computed(() =>
  scale([yColorStart$.value, yColorEnd$.value]).mode('lab'),
)

export const polygons$ = computed(() =>
  chunk(triangles$.value, 3).map(([a, b, c]) => ({
    vertices: {
      a: {
        x: points$.value[a][0],
        y: points$.value[a][1],
      },
      b: {
        x: points$.value[b][0],
        y: points$.value[b][1],
      },
      c: {
        x: points$.value[c][0],
        y: points$.value[c][1],
      },
    },
    center: {
      x: (points$.value[a][0] + points$.value[b][0] + points$.value[c][0]) / 3,
      y: (points$.value[a][1] + points$.value[b][1] + points$.value[c][1]) / 3,
    },
    color: mix(
      xScale$.value(
        Math.max(
          0,
          Math.min(
            1,
            (points$.value[a][0] + points$.value[b][0] + points$.value[c][0]) /
              3 /
              width$.value,
          ),
        ),
      ),
      yScale$.value(
        Math.max(
          0,
          Math.min(
            1,
            (points$.value[a][1] + points$.value[b][1] + points$.value[c][1]) /
              3 /
              height$.value,
          ),
        ),
      ),
      0.5,
      'lab',
    ),
  })),
)

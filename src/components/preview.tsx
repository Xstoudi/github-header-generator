import {
  debug$,
  description$,
  descriptionColor$,
  descriptionSize$,
  height$,
  name$,
  nameColor$,
  nameSize$,
  points$,
  polygons$,
  scope$,
  scopeColor$,
  scopeSize$,
  width$,
} from '../signals/settings'
import { Box, Card } from '@mui/material'
import SVGDownloader from './svg-downloader'
import FakeTexts from './fake-texts'
import FontLoader from './font-includer'

export default function Preview() {
  return (
    <Card>
      <Box p={2}>
        <SVGDownloader>
          <FontLoader />
          {polygons$.value.map(({ vertices: { a, b, c }, center, color }) => (
            <polygon
              key={center}
              points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y}`}
              fill={color.hex('rgb')}
            />
          ))}
          <FakeTexts />
          {scope$.value.length > 0 && (
            <text
              x={
                (width$.value -
                  scopeSize$.value.width -
                  nameSize$.value.width) /
                2
              }
              y={(height$.value + scopeSize$.value.height / 2) / 2 - 20}
              fontSize={36}
              fontWeight="bold"
              fill={scopeColor$}
            >
              {scope$}/
            </text>
          )}
          <text
            x={
              (width$.value - nameSize$.value.width + scopeSize$.value.width) /
              2
            }
            y={(height$.value + nameSize$.value.height / 2) / 2 - 20}
            fontSize={36}
            fontWeight="600"
            fill={nameColor$}
          >
            {name$}
          </text>
          <text
            x={(width$.value - descriptionSize$.value.width) / 2}
            y={(height$.value + descriptionSize$.value.height / 2) / 2 + 20}
            fontSize={24}
            fontWeight="300"
            fill={descriptionColor$}
          >
            {description$}
          </text>
          {debug$.value && (
            <>
              {polygons$.value.map(({ center }) => (
                <circle
                  key={center}
                  cx={center.x}
                  cy={center.y}
                  r={2}
                  fill="grey"
                />
              ))}
              {points$.value.map((point) => (
                <circle
                  key={point}
                  cx={point[0]}
                  cy={point[1]}
                  r={2}
                  fill="white"
                />
              ))}
              <line
                x1={width$.value / 2}
                x2={width$.value / 2}
                y1={0}
                y2={height$}
                stroke="red"
              />
              <line
                x1={0}
                x2={width$.value}
                y1={height$.value / 2}
                y2={height$.value / 2}
                stroke="red"
              />
            </>
          )}
        </SVGDownloader>
      </Box>
    </Card>
  )
}

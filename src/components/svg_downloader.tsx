import { ComponentChildren } from 'preact'
import { Box, Button, Grid } from '@mui/material'
import { height$, viewbox$, width$ } from '../signals/settings'
import { useRef } from 'preact/compat'

interface SVGDownloaderProps {
  children: ComponentChildren
}
export default function SVGDownloader({ children }: SVGDownloaderProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  function download() {
    const serializer = new XMLSerializer()
    let source = serializer.serializeToString(svgRef.current)
    if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
      source = source.replace(
        /^<svg/,
        '<svg xmlns="http://www.w3.org/2000/svg"',
      )
    }
    if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
      source = source.replace(
        /^<svg/,
        '<svg xmlns:xlink="http://www.w3.org/1999/xlink"',
      )
    }
    source = `<?xml version="1.0" standalone="no"?>\r\n${source}`

    const svgBlob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' })
    const svgUrl = URL.createObjectURL(svgBlob)
    const downloadLink = document.createElement('a')
    downloadLink.href = svgUrl
    downloadLink.download = 'header.svg'
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }

  return (
    <>
      <Box mb={2}>
        <svg
          id="preview"
          viewBox={viewbox$}
          width={width$}
          height={height$}
          shapeRendering="crispEdges"
          fontFamily="Noto Sans Mono"
          ref={svgRef}
        >
          {children}
        </svg>
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={2}>
          <Button variant="contained" onClick={download}>
            Download
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

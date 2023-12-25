import {
  Box,
  Checkbox,
  Grid,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import Field from './field'
import {
  cellSize$,
  height$,
  variance$,
  width$,
  debug$,
  xColorStart$,
  xColorEnd$,
  yColorStart$,
  yColorEnd$,
  scope$,
  description$,
  name$,
  nameColor$,
  scopeColor$,
  descriptionColor$,
} from '../signals/settings'
import { MuiColorInput } from 'mui-color-input'
import * as React from 'preact/compat'

export default function Settings() {
  return (
    <Grid container p={2}>
      <Typography variant="h5" gutterBottom>
        Settings
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Field name="Content">
            <Grid item xs={12} mb={2}>
              <TextField
                label="Scope"
                value={scope$}
                onChange={(event) => (scope$.value = event.target.value)}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} mb={2}>
              <TextField
                label="Name"
                value={name$}
                onChange={(event) => (name$.value = event.target.value)}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                value={description$}
                onChange={(event) => (description$.value = event.target.value)}
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Field>
          <Field name="Width">
            <Slider
              min={0}
              max={1000}
              step={50}
              marks
              value={width$.value}
              onChange={(_, value) => (width$.value = value as number)}
              valueLabelDisplay="auto"
            />
          </Field>
          <Field name="Cell size">
            <Slider
              min={20}
              max={300}
              valueLabelDisplay="auto"
              value={cellSize$.value}
              onChange={(_, value) => (cellSize$.value = value as number)}
            />
          </Field>
          <Field name="X scale color start">
            <MuiColorInput
              value={xColorStart$.value}
              onChange={(value) => (xColorStart$.value = value)}
              fullWidth
            />
          </Field>
          <Field name="Y scale color start">
            <MuiColorInput
              value={yColorStart$.value}
              onChange={(value) => (yColorStart$.value = value)}
              fullWidth
            />
          </Field>
          <Field name="Debug">
            <Checkbox
              checked={debug$.value}
              onChange={(_, value) => (debug$.value = value)}
            />
          </Field>
        </Grid>
        <Grid item xs={6}>
          <Stack>
            <Typography variant="h6" gutterBottom>
              Content colors
            </Typography>
            <Box mb={2}>
              <MuiColorInput
                value={scopeColor$.value}
                onChange={(value) => (scopeColor$.value = value)}
                fullWidth
              />
            </Box>
            <Box mb={2}>
              <MuiColorInput
                value={nameColor$.value}
                onChange={(value) => (nameColor$.value = value)}
                fullWidth
              />
            </Box>
            <Box mb={2}>
              <MuiColorInput
                value={descriptionColor$.value}
                onChange={(value) => (descriptionColor$.value = value)}
                fullWidth
              />
            </Box>
            <Field name="Height">
              <Slider
                min={0}
                max={1000}
                step={50}
                marks
                valueLabelDisplay="auto"
                value={height$.value}
                onChange={(_, value) => (height$.value = value as number)}
              />
            </Field>
            <Field name="Variance">
              <Slider
                defaultValue={50}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                value={variance$.value}
                onChange={(_, value) => (variance$.value = value as number)}
              />
            </Field>
            <Field name="X scale color end">
              <MuiColorInput
                value={xColorEnd$.value}
                onChange={(value) => (xColorEnd$.value = value)}
                fullWidth
              />
            </Field>
            <Field name="Y scale color end">
              <MuiColorInput
                value={yColorEnd$.value}
                onChange={(value) => (yColorEnd$.value = value)}
                fullWidth
              />
            </Field>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  )
}

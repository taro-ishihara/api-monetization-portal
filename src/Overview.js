import { useEffect } from 'react'
import { useSetHeader } from './HeaderContext'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import DatasetIcon from '@mui/icons-material/Dataset'
import TimelineIcon from '@mui/icons-material/Timeline'
import PrintDisabledIcon from '@mui/icons-material/PrintDisabled'

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
}

const Overview = () => {
  const setHeader = useSetHeader()
  useEffect(() => {
    setHeader({ title: 'Overview' })
  }, [setHeader])

  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'light' }}
    >
      <Container sx={{ mt: 15, mb: 15, display: 'flex', position: 'relative' }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <DatasetIcon fontSize='large' />
              <Typography variant="h6" sx={{ my: 5 }}>
                Expand your business.
              </Typography>
              <Typography variant="h5">
                {
                  'JR東日本の価値あるデータをAPI経由であなたの製品に組み込むことができます。'
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <TimelineIcon fontSize='large' />
              <Typography variant="h6" sx={{ my: 5 }}>
                Realtime.
              </Typography>
              <Typography variant="h5">
                {
                  'リアルタイムデータを取得できます。'
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <PrintDisabledIcon fontSize='large' />
              <Typography variant="h6" sx={{ my: 5 }}>
                Cost Effective.
              </Typography>
              <Typography variant="h5">
                {'使用量に応じて課金されるので、使っていないときは費用がかかりません。'}
                {'契約書は不要です。'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
export default Overview

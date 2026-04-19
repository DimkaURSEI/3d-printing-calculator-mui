import { useState, useEffect } from 'react'
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Avatar,
  Paper,
  Fade,
  Slide,
} from '@mui/material'
import {
  Print,
  Build,
  Category,
  ElectricBolt,
  Business,
  Work,
  Science,
  Palette,
  Handyman,
  AttachMoney,
  TrendingUp,
} from '@mui/icons-material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7c3aed',
    },
    secondary: {
      main: '#ec4899',
    },
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(124, 58, 237, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#7c3aed',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#7c3aed',
            },
          },
        },
      },
    },
  },
})

function App() {
  const [printerType, setPrinterType] = useState('filament')
  const [materialCost, setMaterialCost] = useState('')
  const [materialWeight, setMaterialWeight] = useState('')
  const [equipmentCost, setEquipmentCost] = useState('')
  const [equipmentLifespan, setEquipmentLifespan] = useState('5')
  const [printTime, setPrintTime] = useState('')
  const [electricityRate, setElectricityRate] = useState('')
  const [printerPower, setPrinterPower] = useState('')
  const [monthlyRent, setMonthlyRent] = useState('')
  const [laborHourlyRate, setLaborHourlyRate] = useState('')
  const [laborHours, setLaborHours] = useState('')
  
  const [consumables, setConsumables] = useState({
    isopropylAlcohol: '',
    dyes: '',
    separators: '',
    paint: '',
  })
  
  const [painting, setPainting] = useState({
    electricityRate: '',
    compressorCost: '',
    airbrushCost: '',
    primerCost: '',
    paintConsumables: '',
  })
  
  const [postProcessing, setPostProcessing] = useState({
    abrasive: '',
    woodenSticks: '',
    plasticSticks: '',
    dremelConsumables: '',
  })

  // Load settings from LocalStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('3dPrintCalculatorSettings')
    if (savedSettings) {
      const settings = JSON.parse(savedSettings)
      setPrinterType(settings.printerType || 'filament')
      setMaterialCost(settings.materialCost || '')
      setMaterialWeight(settings.materialWeight || '')
      setEquipmentCost(settings.equipmentCost || '')
      setEquipmentLifespan(settings.equipmentLifespan || '5')
      setPrintTime(settings.printTime || '')
      setElectricityRate(settings.electricityRate || '')
      setPrinterPower(settings.printerPower || '')
      setMonthlyRent(settings.monthlyRent || '')
      setLaborHourlyRate(settings.laborHourlyRate || '')
      setLaborHours(settings.laborHours || '')
      setConsumables(settings.consumables || {
        isopropylAlcohol: '',
        dyes: '',
        separators: '',
        paint: '',
      })
      setPainting(settings.painting || {
        electricityRate: '',
        compressorCost: '',
        airbrushCost: '',
        primerCost: '',
        paintConsumables: '',
      })
      setPostProcessing(settings.postProcessing || {
        abrasive: '',
        woodenSticks: '',
        plasticSticks: '',
        dremelConsumables: '',
      })
    }
  }, [])

  // Save settings to LocalStorage on any change
  useEffect(() => {
    const settings = {
      printerType,
      materialCost,
      materialWeight,
      equipmentCost,
      equipmentLifespan,
      printTime,
      electricityRate,
      printerPower,
      monthlyRent,
      laborHourlyRate,
      laborHours,
      consumables,
      painting,
      postProcessing,
    }
    localStorage.setItem('3dPrintCalculatorSettings', JSON.stringify(settings))
  }, [printerType, materialCost, materialWeight, equipmentCost, equipmentLifespan, printTime, electricityRate, printerPower, monthlyRent, laborHourlyRate, laborHours, consumables, painting, postProcessing])

  const calculateCosts = () => {
    const materialCostNum = parseFloat(materialCost) || 0
    const materialWeightNum = parseFloat(materialWeight) || 0
    const equipmentCostNum = parseFloat(equipmentCost) || 0
    const equipmentLifespanNum = parseFloat(equipmentLifespan) || 5
    const printTimeNum = parseFloat(printTime) || 0
    const electricityRateNum = parseFloat(electricityRate) || 0
    const printerPowerNum = parseFloat(printerPower) || 0
    const monthlyRentNum = parseFloat(monthlyRent) || 0
    const laborHourlyRateNum = parseFloat(laborHourlyRate) || 0
    const laborHoursNum = parseFloat(laborHours) || 0

    const materialCostPerGram = materialCostNum / materialWeightNum
    const annualDepreciation = equipmentCostNum / equipmentLifespanNum
    const monthlyDepreciation = annualDepreciation / 12
    const electricityCost = (printTimeNum / 60) * (printerPowerNum / 1000) * electricityRateNum
    const rentCost = (printTimeNum / 60 / 24 / 30) * monthlyRentNum
    const laborCost = laborHoursNum * laborHourlyRateNum

    const consumablesCost = Object.values(consumables).reduce((sum, val) => sum + (parseFloat(val) || 0), 0)
    const paintingCost = Object.values(painting).reduce((sum, val) => sum + (parseFloat(val) || 0), 0)
    const postProcessingCost = Object.values(postProcessing).reduce((sum, val) => sum + (parseFloat(val) || 0), 0)

    const totalCost = materialCostPerGram + electricityCost + rentCost + laborCost + consumablesCost + paintingCost + postProcessingCost

    return {
      materialCostPerGram: materialCostPerGram.toFixed(2),
      annualDepreciation: annualDepreciation.toFixed(2),
      monthlyDepreciation: monthlyDepreciation.toFixed(2),
      electricityCost: electricityCost.toFixed(2),
      rentCost: rentCost.toFixed(2),
      laborCost: laborCost.toFixed(2),
      consumablesCost: consumablesCost.toFixed(2),
      paintingCost: paintingCost.toFixed(2),
      postProcessingCost: postProcessingCost.toFixed(2),
      totalCost: totalCost.toFixed(2),
    }
  }

  const costs = calculateCosts()

  const handleConsumableChange = (field, value) => {
    setConsumables(prev => ({ ...prev, [field]: value }))
  }

  const handlePaintingChange = (field, value) => {
    setPainting(prev => ({ ...prev, [field]: value }))
  }

  const handlePostProcessingChange = (field, value) => {
    setPostProcessing(prev => ({ ...prev, [field]: value }))
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
          py: 4,
        }}
      >
        <Container maxWidth="xl">
          <Fade in timeout={800}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  mx: 'auto',
                  mb: 3,
                  background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
                  fontSize: 40,
                }}
              >
                <Print />
              </Avatar>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Калькулятор стоимости 3D-печати
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Профессиональный расчёт стоимости печати
              </Typography>
            </Box>
          </Fade>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4} lg={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 1, width: 32, height: 32, bgcolor: 'primary.main' }}>
                      <Build fontSize="small" />
                    </Avatar>
                    <Typography variant="subtitle1" fontWeight={600}>Оборудование</Typography>
                  </Box>
                  <FormControl fullWidth size="small" sx={{ mb: 1.5 }}>
                    <InputLabel size="small">Тип</InputLabel>
                    <Select
                      value={printerType}
                      label="Тип"
                      size="small"
                      onChange={(e) => setPrinterType(e.target.value)}
                    >
                      <MenuItem value="filament">Филамент</MenuItem>
                      <MenuItem value="resin">Смола</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    label="Стоимость (₽)"
                    type="number"
                    size="small"
                    value={equipmentCost}
                    onChange={(e) => setEquipmentCost(e.target.value)}
                    sx={{ mb: 1.5 }}
                  />
                  <TextField
                    fullWidth
                    label="Срок (лет)"
                    type="number"
                    size="small"
                    value={equipmentLifespan}
                    onChange={(e) => setEquipmentLifespan(e.target.value)}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 1, width: 32, height: 32, bgcolor: 'secondary.main' }}>
                      <Category fontSize="small" />
                    </Avatar>
                    <Typography variant="subtitle1" fontWeight={600}>Материал</Typography>
                  </Box>
                  <TextField
                    fullWidth
                    label="Стоимость (₽)"
                    type="number"
                    size="small"
                    value={materialCost}
                    onChange={(e) => setMaterialCost(e.target.value)}
                    sx={{ mb: 1.5 }}
                  />
                  <TextField
                    fullWidth
                    label="Вес (г)"
                    type="number"
                    size="small"
                    value={materialWeight}
                    onChange={(e) => setMaterialWeight(e.target.value)}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 1, width: 32, height: 32, bgcolor: '#f59e0b' }}>
                      <ElectricBolt fontSize="small" />
                    </Avatar>
                    <Typography variant="subtitle1" fontWeight={600}>Электричество</Typography>
                  </Box>
                  <TextField
                    fullWidth
                    label="Тариф (₽/кВт)"
                    type="number"
                    size="small"
                    value={electricityRate}
                    onChange={(e) => setElectricityRate(e.target.value)}
                    sx={{ mb: 1.5 }}
                  />
                  <TextField
                    fullWidth
                    label="Мощность (Вт)"
                    type="number"
                    size="small"
                    value={printerPower}
                    onChange={(e) => setPrinterPower(e.target.value)}
                    sx={{ mb: 1.5 }}
                  />
                  <TextField
                    fullWidth
                    label="Время (мин)"
                    type="number"
                    size="small"
                    value={printTime}
                    onChange={(e) => setPrintTime(e.target.value)}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 1, width: 32, height: 32, bgcolor: '#10b981' }}>
                      <Business fontSize="small" />
                    </Avatar>
                    <Typography variant="subtitle1" fontWeight={600}>Аренда и работа</Typography>
                  </Box>
                  <TextField
                    fullWidth
                    label="Аренда/мес (₽)"
                    type="number"
                    size="small"
                    value={monthlyRent}
                    onChange={(e) => setMonthlyRent(e.target.value)}
                    sx={{ mb: 1.5 }}
                  />
                  <TextField
                    fullWidth
                    label="Ставка/час (₽)"
                    type="number"
                    size="small"
                    value={laborHourlyRate}
                    onChange={(e) => setLaborHourlyRate(e.target.value)}
                    sx={{ mb: 1.5 }}
                  />
                  <TextField
                    fullWidth
                    label="Часы постобр."
                    type="number"
                    size="small"
                    value={laborHours}
                    onChange={(e) => setLaborHours(e.target.value)}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 1, width: 32, height: 32, bgcolor: '#06b6d4' }}>
                      <Science fontSize="small" />
                    </Avatar>
                    <Typography variant="subtitle1" fontWeight={600}>Расходники</Typography>
                  </Box>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Спирт (₽)"
                        type="number"
                        size="small"
                        value={consumables.isopropylAlcohol}
                        onChange={(e) => handleConsumableChange('isopropylAlcohol', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Чернители (₽)"
                        type="number"
                        size="small"
                        value={consumables.dyes}
                        onChange={(e) => handleConsumableChange('dyes', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Разделители (₽)"
                        type="number"
                        size="small"
                        value={consumables.separators}
                        onChange={(e) => handleConsumableChange('separators', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Краска (₽)"
                        type="number"
                        size="small"
                        value={consumables.paint}
                        onChange={(e) => handleConsumableChange('paint', e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 1, width: 32, height: 32, bgcolor: '#ec4899' }}>
                      <Palette fontSize="small" />
                    </Avatar>
                    <Typography variant="subtitle1" fontWeight={600}>Покраска</Typography>
                  </Box>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Электро (₽)"
                        type="number"
                        size="small"
                        value={painting.electricityRate}
                        onChange={(e) => handlePaintingChange('electricityRate', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Компрессор (₽)"
                        type="number"
                        size="small"
                        value={painting.compressorCost}
                        onChange={(e) => handlePaintingChange('compressorCost', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Аэрограф (₽)"
                        type="number"
                        size="small"
                        value={painting.airbrushCost}
                        onChange={(e) => handlePaintingChange('airbrushCost', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Грунты (₽)"
                        type="number"
                        size="small"
                        value={painting.primerCost}
                        onChange={(e) => handlePaintingChange('primerCost', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Расходники покраски (₽)"
                        type="number"
                        size="small"
                        value={painting.paintConsumables}
                        onChange={(e) => handlePaintingChange('paintConsumables', e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 1, width: 32, height: 32, bgcolor: '#8b5cf6' }}>
                      <Handyman fontSize="small" />
                    </Avatar>
                    <Typography variant="subtitle1" fontWeight={600}>Постобработка</Typography>
                  </Box>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Абразив (₽)"
                        type="number"
                        size="small"
                        value={postProcessing.abrasive}
                        onChange={(e) => handlePostProcessingChange('abrasive', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Дерев. палочки (₽)"
                        type="number"
                        size="small"
                        value={postProcessing.woodenSticks}
                        onChange={(e) => handlePostProcessingChange('woodenSticks', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Пласт. стеки (₽)"
                        type="number"
                        size="small"
                        value={postProcessing.plasticSticks}
                        onChange={(e) => handlePostProcessingChange('plasticSticks', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Dremel (₽)"
                        type="number"
                        size="small"
                        value={postProcessing.dremelConsumables}
                        onChange={(e) => handlePostProcessingChange('dremelConsumables', e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Fade in timeout={1300}>
                <Paper
                  sx={{
                    p: 2,
                    background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.3) 0%, rgba(236, 72, 153, 0.3) 100%)',
                    border: '2px solid rgba(124, 58, 237, 0.5)',
                    boxShadow: '0 8px 32px rgba(124, 58, 237, 0.3)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ mr: 1, bgcolor: '#7c3aed', width: 40, height: 40 }}>
                        <AttachMoney fontSize="small" />
                      </Avatar>
                      <Typography variant="h6">Итого</Typography>
                    </Box>
                    <Box
                      sx={{
                        px: 3,
                        py: 1,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.6) 0%, rgba(236, 72, 153, 0.6) 100%)',
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          background: 'linear-gradient(135deg, #fff 0%, #e0e7ff 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        {costs.totalCost} ₽
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Grid container spacing={1}>
                    <Grid item xs={6} sm={4} md={3}>
                      <Box sx={{ p: 1.5, borderRadius: 1, background: 'rgba(255,255,255,0.1)' }}>
                        <Typography variant="caption" color="text.secondary">Материал (₽/г)</Typography>
                        <Typography variant="body1" fontWeight={600} color="primary.main">{costs.materialCostPerGram}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <Box sx={{ p: 1.5, borderRadius: 1, background: 'rgba(255,255,255,0.1)' }}>
                        <Typography variant="caption" color="text.secondary">Амортизация/год (₽)</Typography>
                        <Typography variant="body1" fontWeight={600} color="secondary.main">{costs.annualDepreciation}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <Box sx={{ p: 1.5, borderRadius: 1, background: 'rgba(255,255,255,0.1)' }}>
                        <Typography variant="caption" color="text.secondary">Электричество (₽)</Typography>
                        <Typography variant="body1" fontWeight={600} color="#f59e0b">{costs.electricityCost}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <Box sx={{ p: 1.5, borderRadius: 1, background: 'rgba(255,255,255,0.1)' }}>
                        <Typography variant="caption" color="text.secondary">Аренда (₽)</Typography>
                        <Typography variant="body1" fontWeight={600} color="#10b981">{costs.rentCost}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <Box sx={{ p: 1.5, borderRadius: 1, background: 'rgba(255,255,255,0.1)' }}>
                        <Typography variant="caption" color="text.secondary">Работа (₽)</Typography>
                        <Typography variant="body1" fontWeight={600} color="#06b6d4">{costs.laborCost}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <Box sx={{ p: 1.5, borderRadius: 1, background: 'rgba(255,255,255,0.1)' }}>
                        <Typography variant="caption" color="text.secondary">Расходники (₽)</Typography>
                        <Typography variant="body1" fontWeight={600} color="#ec4899">{costs.consumablesCost}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <Box sx={{ p: 1.5, borderRadius: 1, background: 'rgba(255,255,255,0.1)' }}>
                        <Typography variant="caption" color="text.secondary">Покраска (₽)</Typography>
                        <Typography variant="body1" fontWeight={600} color="#8b5cf6">{costs.paintingCost}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <Box sx={{ p: 1.5, borderRadius: 1, background: 'rgba(255,255,255,0.1)' }}>
                        <Typography variant="caption" color="text.secondary">Постобработка (₽)</Typography>
                        <Typography variant="body1" fontWeight={600} color="#f97316">{costs.postProcessingCost}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App

import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import './index.scss'
import { getYearStats } from './selectors'
import Rhythm from 'components/Rhythm'
import { OutcomeCard } from './cards/OutcomeCard'
import { NoCategoryCard } from './cards/NoCategoryCard'
import { QRCard } from './cards/QRCard'
import { PayeeByOutcomeCard } from './cards/PayeeByOutcomeCard'
import { PayeeByFrequencyCard } from './cards/PayeeByFrequencyCard'
import { IncomeCard } from './cards/IncomeCard'
import { Card } from './cards/Card'

export default function Review() {
  // Shows previous year until September then unlocks current year
  const startingDate =
    new Date().getMonth() > 8 // September
      ? new Date().getFullYear()
      : new Date().getFullYear() - 1
  const [year, setYear] = useState(startingDate)
  const yearStats = useSelector(getYearStats(year))

  if (!yearStats) return null
  const { total, byTag, receipts, byPayee } = yearStats

  const noCategoryValue = byTag.null
    ? byTag.null.incomeTransactions.length +
      byTag.null.outcomeTransactions.length
    : 0

  return (
    <Box className="container">
      <Rhythm gap={2} axis="y" p={3} pb={10}>
        <CardTitle year={year} />
        <IncomeCard byTag={byTag} />
        <PayeeByOutcomeCard byPayee={byPayee} />
        <PayeeByFrequencyCard byPayee={byPayee} />
        <OutcomeCard transaction={total.outcomeTransactions[0]} />
        <QRCard value={receipts} />
        <NoCategoryCard value={noCategoryValue} />
        <Button onClick={() => setYear(year - 1)}>
          А что было в прошлом году?
        </Button>
      </Rhythm>
    </Box>
  )
}

function CardTitle({ year }: { year: number }) {
  return (
    <Card>
      <Typography
        variant="body1"
        align="center"
        color="textSecondary"
        className="results"
      >
        ИТОГИ ГОДА
      </Typography>
      <Box position="relative">
        <Typography variant="h1" align="center" className="year">
          <b>{year}</b>
        </Typography>
        <Typography variant="h1" align="center" className="year shadow">
          <b>{year}</b>
        </Typography>
      </Box>
    </Card>
  )
}

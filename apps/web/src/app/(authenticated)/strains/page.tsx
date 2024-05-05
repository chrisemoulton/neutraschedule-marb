'use client'

import { useEffect, useState } from 'react'
import { Select, Typography, Spin, Row, Col } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function StrainSelectionPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id

  const [strains, setStrains] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchStrains = async () => {
      setLoading(true)
      try {
        const strainsFound = await Api.Strain.findMany()
        setStrains(strainsFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch strains', { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }

    fetchStrains()
  }, [])

  const handleStrainChange = (strainId: string) => {
    enqueueSnackbar('Strain selected successfully', { variant: 'success' })
    // Navigate to another page or perform further actions
  }

  return (
    <PageLayout layout="full-width">
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12} xl={10}>
          <Title level={2}>Select Cannabis Strain</Title>
          <Text>
            Choose a cannabis strain to tailor the fogging parameters for your
            cultivation process.
          </Text>
          {loading ? (
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />
          ) : (
            <Select
              showSearch
              style={{ width: '100%', marginTop: 20 }}
              placeholder="Select a strain"
              optionFilterProp="children"
              onChange={handleStrainChange}
              filterOption={(input, option) =>
                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {strains?.map(strain => (
                <Option key={strain.id} value={strain.id}>
                  {strain.name}
                </Option>
              ))}
            </Select>
          )}
        </Col>
      </Row>
    </PageLayout>
  )
}

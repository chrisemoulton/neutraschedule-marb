'use client'

import React, { useEffect, useState } from 'react'
import { Button, Form, Input, DatePicker, TimePicker, Typography } from 'antd'
import { LoadingOutlined, SaveOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function EditSessionPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    if (params.id) {
      fetchSession()
    }
  }, [params.id])

  const fetchSession = async () => {
    setLoading(true)
    try {
      const sessionData = await Api.Session.findOne(params.id, {
        includes: [
          'schedule',
          'environmentalConditions',
          'sessionNutrients',
          'dataPoints',
        ],
      })
      setSession(sessionData)
      form.setFieldsValue({
        actualStartTime: dayjs(sessionData.actualStartTime),
        actualEndTime: dayjs(sessionData.actualEndTime),
      })
    } catch (error) {
      enqueueSnackbar('Failed to fetch session details', { variant: 'error' })
    }
    setLoading(false)
  }

  const handleSave = async values => {
    setLoading(true)
    try {
      const updatedValues = {
        ...values,
        actualStartTime: values.actualStartTime.toISOString(),
        actualEndTime: values.actualEndTime.toISOString(),
      }
      await Api.Session.updateOne(params.id, updatedValues)
      enqueueSnackbar('Session updated successfully', { variant: 'success' })
      router.push('/sessions')
    } catch (error) {
      enqueueSnackbar('Failed to update session', { variant: 'error' })
    }
    setLoading(false)
  }

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Edit Fogging Session</Title>
      <Text>Edit the details of your cannabis cultivation session.</Text>
      {loading ? (
        <LoadingOutlined style={{ fontSize: 24 }} spin />
      ) : (
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item name="actualStartTime" label="Start Time">
            <DatePicker showTime />
          </Form.Item>
          <Form.Item name="actualEndTime" label="End Time">
            <DatePicker showTime />
          </Form.Item>
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
            Save Changes
          </Button>
        </Form>
      )}
    </PageLayout>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { Button, Form, Input, Select, Typography } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function EditSchedulePage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [schedule, setSchedule] = useState<Model.Schedule | null>(null)
  const [form] = Form.useForm()

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const fetchedSchedule = await Api.Schedule.findOne(params.id, {
          includes: ['user', 'room', 'strain'],
        })
        setSchedule(fetchedSchedule)
        form.setFieldsValue({
          startTime: dayjs(fetchedSchedule.startTime).format(
            'YYYY-MM-DDTHH:mm',
          ),
          endTime: dayjs(fetchedSchedule.endTime).format('YYYY-MM-DDTHH:mm'),
          frequency: fetchedSchedule.frequency,
          roomId: fetchedSchedule.roomId,
          strainId: fetchedSchedule.strainId,
        })
      } catch (error) {
        enqueueSnackbar('Failed to fetch schedule details', {
          variant: 'error',
        })
      }
    }

    fetchSchedule()
  }, [params.id, form])

  const handleSubmit = async (values: any) => {
    try {
      const updatedValues = {
        ...values,
        userId: userId,
        startTime: new Date(values.startTime).toISOString(),
        endTime: new Date(values.endTime).toISOString(),
      }
      await Api.Schedule.updateOne(params.id, updatedValues)
      enqueueSnackbar('Schedule updated successfully', { variant: 'success' })
      router.push('/schedules')
    } catch (error) {
      enqueueSnackbar('Failed to update schedule', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <Title level={2}>
        <ClockCircleOutlined /> Edit Fogging Schedule
      </Title>
      <Text>Edit the existing fogging schedule for cannabis cultivation.</Text>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="startTime"
          label="Start Time"
          rules={[{ required: true, message: 'Please input the start time!' }]}
        >
          <Input type="datetime-local" />
        </Form.Item>
        <Form.Item
          name="endTime"
          label="End Time"
          rules={[{ required: true, message: 'Please input the end time!' }]}
        >
          <Input type="datetime-local" />
        </Form.Item>
        <Form.Item
          name="frequency"
          label="Frequency"
          rules={[{ required: true, message: 'Please select the frequency!' }]}
        >
          <Select placeholder="Select frequency">
            <Option value="daily">Daily</Option>
            <Option value="weekly">Weekly</Option>
            <Option value="biweekly">Biweekly</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="roomId"
          label="Room"
          rules={[{ required: true, message: 'Please select a room!' }]}
        >
          <Select placeholder="Select room">
            {/* Room options should be fetched and listed here */}
          </Select>
        </Form.Item>
        <Form.Item
          name="strainId"
          label="Strain"
          rules={[{ required: true, message: 'Please select a strain!' }]}
        >
          <Select placeholder="Select strain">
            {/* Strain options should be fetched and listed here */}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Schedule
          </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}

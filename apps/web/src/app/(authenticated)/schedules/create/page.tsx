'use client'

import { useEffect, useState } from 'react'
import {
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Typography,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function CreateSchedulePage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id

  const [form] = Form.useForm()
  const [rooms, setRooms] = useState<Model.Room[]>([])
  const [strains, setStrains] = useState<Model.Strain[]>([])
  const [nutrients, setNutrients] = useState<Model.Nutrient[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomsData = await Api.Room.findMany()
        setRooms(roomsData)
        const strainsData = await Api.Strain.findMany()
        setStrains(strainsData)
        const nutrientsData = await Api.Nutrient.findMany()
        setNutrients(nutrientsData)
      } catch (error) {
        enqueueSnackbar('Failed to fetch data', { variant: 'error' })
      }
    }

    fetchData()
  }, [])

  const handleSubmit = async values => {
    try {
      const { startTime, endTime, frequency, roomId, strainId, nutrientIds } =
        values
      const formattedStartTime = dayjs(startTime).format(
        'YYYY-MM-DDTHH:mm:ss[Z]',
      )
      const formattedEndTime = dayjs(endTime).format('YYYY-MM-DDTHH:mm:ss[Z]')

      await Api.Schedule.createOneByUserId(userId, {
        startTime: formattedStartTime,
        endTime: formattedEndTime,
        frequency,
        roomId,
        strainId,
      })

      nutrientIds.forEach(async nutrientId => {
        await Api.Nutrient.createOne({ id: nutrientId })
      })

      enqueueSnackbar('Schedule created successfully', { variant: 'success' })
      router.push('/schedules')
    } catch (error) {
      enqueueSnackbar('Failed to create schedule', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Create Fogging Schedule</Title>
      <Text>Create custom schedules for cannabis cultivation.</Text>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="roomId"
          label="Room"
          rules={[{ required: true, message: 'Please select a room' }]}
        >
          <Select placeholder="Select a room">
            {rooms.map(room => (
              <Option key={room.id} value={room.id}>
                {room.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="strainId"
          label="Strain"
          rules={[{ required: true, message: 'Please select a strain' }]}
        >
          <Select placeholder="Select a strain">
            {strains.map(strain => (
              <Option key={strain.id} value={strain.id}>
                {strain.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="nutrientIds"
          label="Nutrients"
          rules={[{ required: true, message: 'Please select nutrients' }]}
        >
          <Select mode="multiple" placeholder="Select nutrients">
            {nutrients.map(nutrient => (
              <Option key={nutrient.id} value={nutrient.id}>
                {nutrient.type}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="frequency"
          label="Frequency"
          rules={[{ required: true, message: 'Please input the frequency' }]}
        >
          <Input placeholder="Enter frequency (e.g., daily, weekly)" />
        </Form.Item>
        <Form.Item
          name="startTime"
          label="Start Time"
          rules={[{ required: true, message: 'Please select start time' }]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item
          name="endTime"
          label="End Time"
          rules={[{ required: true, message: 'Please select end time' }]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
            Create Schedule
          </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}

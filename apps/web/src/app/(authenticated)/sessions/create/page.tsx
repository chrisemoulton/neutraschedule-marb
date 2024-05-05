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
  Row,
  Col,
  Card,
} from 'antd'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function CreateSessionPage() {
  const [form] = Form.useForm()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id

  const [rooms, setRooms] = useState([])
  const [strains, setStrains] = useState([])

  useEffect(() => {
    const fetchRoomsAndStrains = async () => {
      try {
        const roomsFound = await Api.Room.findMany()
        const strainsFound = await Api.Strain.findMany()
        setRooms(roomsFound)
        setStrains(strainsFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch rooms and strains', {
          variant: 'error',
        })
      }
    }

    fetchRoomsAndStrains()
  }, [])

  const onFinish = async values => {
    try {
      const { startTime, endTime, room, strain } = values
      const formattedStartTime = dayjs(startTime).format(
        'YYYY-MM-DDTHH:mm:ss[Z]',
      )
      const formattedEndTime = dayjs(endTime).format('YYYY-MM-DDTHH:mm:ss[Z]')

      const scheduleValues = {
        startTime: formattedStartTime,
        endTime: formattedEndTime,
        roomId: room,
        strainId: strain,
      }

      const newSchedule = await Api.Schedule.createOneByUserId(
        userId,
        scheduleValues,
      )
      enqueueSnackbar('Session created successfully', { variant: 'success' })
      router.push('/sessions')
    } catch (error) {
      enqueueSnackbar('Failed to create session', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <Row justify="center">
        <Col xs={24} sm={18} md={12}>
          <Card>
            <Title level={2}>Create New Fogging Session</Title>
            <Text type="secondary">
              Specify the details for the cannabis cultivation session.
            </Text>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                name="room"
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
                name="strain"
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
                name="startTime"
                label="Start Time"
                rules={[
                  { required: true, message: 'Please select a start time' },
                ]}
              >
                <DatePicker showTime />
              </Form.Item>
              <Form.Item
                name="endTime"
                label="End Time"
                rules={[
                  { required: true, message: 'Please select an end time' },
                ]}
              >
                <DatePicker showTime />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Create Session
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}

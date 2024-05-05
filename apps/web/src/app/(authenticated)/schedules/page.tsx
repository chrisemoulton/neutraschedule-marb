'use client'

import { useEffect, useState } from 'react'
import { Button, Col, Form, Input, Row, Select, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ScheduleManagementPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id

  const [rooms, setRooms] = useState([])
  const [strains, setStrains] = useState([])
  const [schedules, setSchedules] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomsData = await Api.Room.findMany()
        setRooms(roomsData)
        const strainsData = await Api.Strain.findMany()
        setStrains(strainsData)
        const schedulesData = await Api.Schedule.findMany({
          includes: ['room', 'strain', 'user'],
        })
        setSchedules(schedulesData)
      } catch (error) {
        enqueueSnackbar('Failed to fetch data', { variant: 'error' })
      }
    }
    fetchData()
  }, [])

  const handleCreateSchedule = async values => {
    try {
      await Api.Schedule.createOneByUserId(userId, {
        ...values,
        userId,
        startTime: dayjs(values.startTime).toISOString(),
        endTime: dayjs(values.endTime).toISOString(),
      })
      enqueueSnackbar('Schedule created successfully', { variant: 'success' })
      router.push('/schedules')
    } catch (error) {
      enqueueSnackbar('Failed to create schedule', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Schedule Management</Title>
      <Text type="secondary">
        Manage and create fogging schedules for different cannabis strains and
        rooms.
      </Text>
      <Row justify="center" style={{ marginTop: 20 }}>
        <Col span={24}>
          <Form layout="vertical" onFinish={handleCreateSchedule}>
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
              name="startTime"
              label="Start Time"
              rules={[{ required: true, message: 'Please input start time' }]}
            >
              <Input type="datetime-local" />
            </Form.Item>
            <Form.Item
              name="endTime"
              label="End Time"
              rules={[{ required: true, message: 'Please input end time' }]}
            >
              <Input type="datetime-local" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                Create Schedule
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </PageLayout>
  )
}

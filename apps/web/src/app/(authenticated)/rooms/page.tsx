'use client'

import { useEffect, useState } from 'react'
import {
  Button,
  Table,
  Typography,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
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

export default function RoomManagementPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id

  const [rooms, setRooms] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsFound = await Api.Room.findMany({ includes: ['schedules'] })
        setRooms(roomsFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch rooms', { variant: 'error' })
      }
    }

    fetchRooms()
  }, [])

  const handleAddRoom = async values => {
    try {
      const newRoom = await Api.Room.updateOne(values.id, {
        name: values.name,
        schedules: values.schedules,
      })
      setRooms([...rooms, newRoom])
      enqueueSnackbar('Room added successfully', { variant: 'success' })
      setIsModalVisible(false)
      form.resetFields()
    } catch (error) {
      enqueueSnackbar('Failed to add room', { variant: 'error' })
    }
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const columns = [
    {
      title: 'Room Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Created At',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      render: text => dayjs(text).format('YYYY-MM-DD'),
    },
    {
      title: 'Schedules',
      dataIndex: 'schedules',
      key: 'schedules',
      render: schedules => schedules?.map(sch => sch.startTime).join(', '),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button onClick={() => router.push(`/schedules/edit/${record.id}`)}>
          Edit Schedules
        </Button>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <Title>Room Management</Title>
      <Text>Manage and monitor different cultivation rooms.</Text>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        Add Room
      </Button>
      <Table dataSource={rooms} columns={columns} rowKey="id" />

      <Modal
        title="Add New Room"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleAddRoom}>
          <Form.Item
            name="name"
            label="Room Name"
            rules={[{ required: true, message: 'Please input the room name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="schedules" label="Schedules">
            <Select mode="multiple" placeholder="Select schedules">
              {/* Assuming schedules are fetched and stored similarly */}
              {rooms[0]?.schedules?.map(sch => (
                <Option key={sch.id} value={sch.id}>
                  {sch.startTime}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Add Room
          </Button>
        </Form>
      </Modal>
    </PageLayout>
  )
}

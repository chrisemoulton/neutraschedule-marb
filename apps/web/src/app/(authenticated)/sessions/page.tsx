'use client'

import { useEffect, useState } from 'react'
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  DatePicker,
  notification,
} from 'antd'
import {
  ExclamationCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function SessionManagementPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [sessions, setSessions] = useState<Model.Session[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentSession, setCurrentSession] = useState<Model.Session | null>(
    null,
  )
  const [form] = Form.useForm()

  useEffect(() => {
    fetchSessions()
  }, [])

  const fetchSessions = async () => {
    try {
      const sessionsFound = await Api.Session.findMany({
        includes: ['schedule'],
      })
      setSessions(sessionsFound)
    } catch (error) {
      enqueueSnackbar('Failed to fetch sessions', { variant: 'error' })
    }
  }

  const showEditModal = (session: Model.Session) => {
    setCurrentSession(session)
    form.setFieldsValue({
      actualStartTime: dayjs(session.actualStartTime).format(
        'YYYY-MM-DD HH:mm:ss',
      ),
      actualEndTime: dayjs(session.actualEndTime).format('YYYY-MM-DD HH:mm:ss'),
    })
    setIsModalVisible(true)
  }

  const handleUpdate = async (values: any) => {
    if (!currentSession) return
    try {
      const updatedSession = await Api.Session.updateOne(currentSession.id, {
        actualStartTime: values.actualStartTime,
        actualEndTime: values.actualEndTime,
      })
      fetchSessions()
      setIsModalVisible(false)
      enqueueSnackbar('Session updated successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to update session', { variant: 'error' })
    }
  }

  const deleteSession = async (sessionId: string) => {
    Modal.confirm({
      title: 'Are you sure delete this session?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone',
      onOk: async () => {
        try {
          await Api.Session.deleteOne(sessionId)
          fetchSessions()
          enqueueSnackbar('Session deleted successfully', {
            variant: 'success',
          })
        } catch (error) {
          enqueueSnackbar('Failed to delete session', { variant: 'error' })
        }
      },
    })
  }

  const columns = [
    {
      title: 'Start Time',
      dataIndex: 'actualStartTime',
      key: 'actualStartTime',
    },
    { title: 'End Time', dataIndex: 'actualEndTime', key: 'actualEndTime' },
    { title: 'Schedule', dataIndex: ['schedule', 'id'], key: 'scheduleId' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: Model.Session) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => deleteSession(record.id)}
          />
        </>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <Typography.Title level={2}>Session Management</Typography.Title>
      <Typography.Paragraph>
        Manage and monitor fogging sessions for cannabis cultivation, including
        viewing, editing, and deleting sessions.
      </Typography.Paragraph>
      <Table dataSource={sessions} columns={columns} rowKey="id" />
      <Modal
        title="Edit Session"
        visible={isModalVisible}
        onOk={form.submit}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} onFinish={handleUpdate} layout="vertical">
          <Form.Item name="actualStartTime" label="Start Time">
            <DatePicker showTime />
          </Form.Item>
          <Form.Item name="actualEndTime" label="End Time">
            <DatePicker showTime />
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}

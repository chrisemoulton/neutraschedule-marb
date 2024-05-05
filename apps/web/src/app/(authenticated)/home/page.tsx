'use client'

import { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Typography, Spin, Space } from 'antd'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function HomePage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id

  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true)
      try {
        const sessionsFound = await Api.Session.findMany({
          includes: ['schedule', 'schedule.sessions'],
        })
        setSessions(sessionsFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch sessions', { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchSessions()
    }
  }, [userId])

  const handleNavigate = path => {
    router.push(path)
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <Title level={2}>Dashboard</Title>
      <Text>
        Welcome to your management dashboard. Here you can view and manage your
        fogging sessions.
      </Text>

      <Button
        type="primary"
        style={{ margin: '20px 0' }}
        onClick={() => handleNavigate('/sessions/create')}
      >
        Create New Session
      </Button>

      <Row gutter={[16, 16]}>
        {loading ? (
          <Spin size="large" />
        ) : (
          sessions?.map(session => (
            <Col span={8} key={session.id}>
              <Card
                title={`Session ID: ${session.id}`}
                extra={
                  <a
                    onClick={() =>
                      handleNavigate(`/sessions/edit/${session.id}`)
                    }
                  >
                    Edit
                  </a>
                }
              >
                <p>
                  <strong>Start:</strong>{' '}
                  {dayjs(session.actualStartTime).format('YYYY-MM-DD HH:mm')}
                </p>
                <p>
                  <strong>End:</strong>{' '}
                  {dayjs(session.actualEndTime).format('YYYY-MM-DD HH:mm')}
                </p>
                <p>
                  <strong>Status:</strong>{' '}
                  {session.schedule?.status || 'Unknown'}
                </p>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  )
}

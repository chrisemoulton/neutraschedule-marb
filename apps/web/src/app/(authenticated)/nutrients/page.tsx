'use client'

import { useEffect, useState } from 'react'
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Table,
  Typography,
} from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function NutrientManagementPage() {
  const [nutrients, setNutrients] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentNutrient, setCurrentNutrient] = useState(null)
  const [form] = Form.useForm()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id

  useEffect(() => {
    fetchNutrients()
  }, [])

  const fetchNutrients = async () => {
    try {
      const nutrientsFound = await Api.Nutrient.findMany({
        includes: ['sessionNutrients', 'sessionNutrients.nutrient'],
      })
      setNutrients(nutrientsFound)
    } catch (error) {
      enqueueSnackbar('Failed to fetch nutrients', { variant: 'error' })
    }
  }

  const handleAdd = () => {
    setCurrentNutrient(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEdit = nutrient => {
    setCurrentNutrient(nutrient)
    form.setFieldsValue({
      type: nutrient.type,
      concentration: nutrient.concentration,
    })
    setIsModalVisible(true)
  }

  const handleDelete = async nutrientId => {
    try {
      await Api.Nutrient.deleteOne(nutrientId)
      fetchNutrients()
      enqueueSnackbar('Nutrient deleted successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to delete nutrient', { variant: 'error' })
    }
  }

  const handleFormSubmit = async values => {
    try {
      if (currentNutrient) {
        await Api.Nutrient.updateOne(currentNutrient.id, values)
        enqueueSnackbar('Nutrient updated successfully', { variant: 'success' })
      } else {
        await Api.Nutrient.createOne(values)
        enqueueSnackbar('Nutrient added successfully', { variant: 'success' })
      }
      fetchNutrients()
      setIsModalVisible(false)
    } catch (error) {
      enqueueSnackbar('Failed to submit nutrient', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Concentration',
      dataIndex: 'concentration',
      key: 'concentration',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          />
        </>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <Title>Nutrient Management</Title>
      <Text>
        Manage the types and concentrations of nutrients used in fogging
        sessions for cannabis cultivation.
      </Text>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAdd}
        style={{ marginBottom: 16 }}
      >
        Add Nutrient
      </Button>
      <Table dataSource={nutrients} columns={columns} rowKey="id" />

      <Modal
        title={`${currentNutrient ? 'Edit' : 'Add'} Nutrient`}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Form.Item
            name="type"
            label="Type"
            rules={[
              { required: true, message: 'Please input the type of nutrient!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="concentration"
            label="Concentration"
            rules={[
              { required: true, message: 'Please input the concentration!' },
            ]}
          >
            <InputNumber min={0} max={100} />
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}

import { RouterObject } from '@web/core/router'
import { useDesignSystem } from '@web/designSystem'
import { Model } from '@web/domain'
import { useAuthentication } from '@web/modules/authentication'
import { Col, Layout, Row } from 'antd'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { Leftbar } from './components/Leftbar'
import { Logo } from './components/Logo'
import { SubNavigation } from './components/SubNavigation'
import { Topbar } from './components/Topbar/index.layout'

interface Props {
  children: ReactNode
}

export const NavigationLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter()

  const authentication = useAuthentication()
  const user = authentication?.user as Model.User

  const { isMobile } = useDesignSystem()

  const goTo = (url: string) => {
    router.push(url)
  }

  const goToUserPage = (url: string) => {
    router.push(url.replace(':id', user?.id))
  }

  const itemsLeftbar = [
    {
      key: '/home',
      label: 'Dashboard',
      onClick: () => goTo('/home'),
    },

    {
      key: '/schedules',
      label: 'Manage Schedules',
      onClick: () => goTo('/schedules'),
    },

    {
      key: '/schedules/create',
      label: 'Create Schedule',
      onClick: () => goTo('/schedules/create'),
    },

    {
      key: '/sessions',
      label: 'Manage Sessions',
      onClick: () => goTo('/sessions'),
    },

    {
      key: '/sessions/create',
      label: 'Create Session',
      onClick: () => goTo('/sessions/create'),
    },

    {
      key: '/rooms',
      label: 'Manage Rooms',
      onClick: () => goTo('/rooms'),
    },

    {
      key: '/strains',
      label: 'Select Strain',
      onClick: () => goTo('/strains'),
    },

    {
      key: '/nutrients',
      label: 'Manage Nutrients',
      onClick: () => goTo('/nutrients'),
    },
  ]

  const itemsUser = []

  const itemsTopbar = []

  const itemsSubNavigation = [
    {
      key: '/home',
      label: 'Dashboard',
    },

    {
      key: '/schedules',
      label: 'Manage Schedules',
    },

    {
      key: '/schedules/create',
      label: 'Create Schedule',
    },

    {
      key: '/schedules/edit/:id',
      label: 'Edit Schedule',
    },

    {
      key: '/sessions',
      label: 'Manage Sessions',
    },

    {
      key: '/sessions/create',
      label: 'Create Session',
    },

    {
      key: '/sessions/edit/:id',
      label: 'Edit Session',
    },

    {
      key: '/rooms',
      label: 'Manage Rooms',
    },

    {
      key: '/strains',
      label: 'Select Strain',
    },

    {
      key: '/nutrients',
      label: 'Manage Nutrients',
    },
  ]

  const itemsMobile = [
    {
      key: 'profile',
      label: 'Profile',
      onClick: () => goTo(RouterObject.route.PROFILE),
    },
    {
      key: 'notifications',
      label: 'Notifications',
      onClick: () => goTo(RouterObject.route.NOTIFICATIONS),
    },
    ...itemsTopbar,
    ...itemsLeftbar,
  ]

  const isLeftbar = itemsLeftbar.length > 0 && !isMobile

  return (
    <>
      <Layout>
        <Row
          style={{
            height: '100vh',
            width: '100vw',
          }}
        >
          {isLeftbar && (
            <Col>
              <Leftbar
                items={itemsLeftbar}
                itemsUser={itemsUser}
                logo={<Logo className="m-2" />}
              />
            </Col>
          )}

          <Col
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <Topbar
              isMobile={isMobile}
              items={itemsTopbar}
              itemsMobile={itemsMobile}
              logo={!isLeftbar && <Logo width={40} height={40} />}
            />

            <Col
              style={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <SubNavigation items={itemsSubNavigation} />

              {children}
            </Col>
          </Col>
        </Row>
      </Layout>
    </>
  )
}

import {
  Box,
  Button,
  Heading,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useDisclosure,
} from '@chakra-ui/react'
import { List } from '@/components/List'
import { Unverified } from '@/components/Unverified'
import { Upload } from '@/components/Upload'

export default function Home() {
  const toggleUpload = useDisclosure()

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      {/* header */}
      <HStack
        sx={{
          height: '70px',
          position: 'sticky',
          top: 0,
          bg: 'white',
        }}
      >
        <Heading
          sx={{
            fontSize: 'xl',
          }}
        >
          Transaction Matcher
        </Heading>
      </HStack>

      {/* main content */}
      <Box>
        {/* =========== upload form =========== */}
        <HStack
          sx={{
            justifyContent: 'flex-end',
          }}
        >
          <Button onClick={toggleUpload.onOpen}>Upload Data</Button>
        </HStack>

        <Upload {...toggleUpload} />

        {/* ========= data ============= */}
        <Tabs>
          <TabList>
            <Tab>Verified Data</Tab>
            <Tab>Unverified Transactions</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <List />
            </TabPanel>
            <TabPanel>
              <Unverified />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  )
}

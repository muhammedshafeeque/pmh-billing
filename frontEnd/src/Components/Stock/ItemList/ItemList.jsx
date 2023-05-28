import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react'
import { Col, Row } from 'antd'
import './ItemList.scss'
function ItemList() {
  return (
    <div>
        <Table size="sm">
          <Row span={24}>
              <Col span={8}></Col>
          </Row>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>code</Th>
              <Th>Section</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            </Tr>
          </Tbody>
        </Table>
    </div>
  )
}

export default ItemList
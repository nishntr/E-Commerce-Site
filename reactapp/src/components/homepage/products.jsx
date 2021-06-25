import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'

export default function Products() {
    return (
        <Container>
            <Row>
                <Col xs={6} md={4}>
                    xs=6 md=4
                </Col>
                <Col xs={6} md={4}>
                    xs=6 md=4
                </Col>
                <Col xs={6} md={4}>
                    xs=6 md=4
                </Col>
            </Row>

        </Container>
    )
}

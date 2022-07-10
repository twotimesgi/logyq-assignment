import { Card, Row, Col, Badge } from 'react-bootstrap';
import React from 'react';
import MapComponent from './MapComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';


function InfoContainer(props) {
    if (props.data && !props.error) {
        // Se non ci sono errori e i dati sono presenti
        return (
            <>
                <Card.Header className="rounded-0">Product Data ({props.data._id})</Card.Header>
                <Card.Body className='py-2 px-5'>
                    <Row className="py-4">
                        <Col md={12}>
                            <h5>Transaction Hash</h5>
                            <span><a href={'https://cardanoscan.io/transaction/' + props.data.hash}>{props.data.hash}</a></span>
                        </Col>
                    </Row>


                    <Row className="py-4 border-top">
                        <Col md={4}>
                            <h5>Prodotto</h5>
                        </Col>
                        <Col md={8}>
                            <div><span className="my-bold">ID: </span>{props.data._id}</div>
                            <div><span className="my-bold">Data di consegna: </span>{props.data.consegna}</div>
                        </Col>

                    </Row>
                    <Row className="py-4 border-top">

                        <Col md={4}>
                            <h5>Vendemmia</h5>
                            </Col>
                            <Col md={8}>
                                <div><span className="my-bold">Inizio:</span> {props.data.vendemmia.inizio}</div>
                                <div><span className="my-bold">Fine:</span> {props.data.vendemmia.fine}</div>
                                </Col>
                    </Row>

                    <Row className="py-4 border-top">
                        <Col md={4}>
                            <h5>Fermentazione</h5>
                        </Col>
                        <Col md={8}>
                            <div><span className="my-bold">Temperatura media: </span> {props.data.fermentazione['temperatura media']}</div>
                            <div><span className="my-bold">Inoculo piede: </span>{props.data.fermentazione['inoculo piede']}</div>
                            <div><span className="my-bold">Termine: </span>{props.data.fermentazione['termine']}</div>
                            <div><span className="my-bold">Inizio pressatura: </span>{props.data['inizio pressatura']}</div>

                        </Col>
                    </Row>

                    <Row className="py-4 border-top">
                        <Col md={4}>
                            <h5>Imbottigliamento</h5>

                        </Col>
                        <Col md={8}>
                            <div><span className="my-bold">Data</span>: {props.data.imbottigliamento.data}</div>
                            <div><span className="my-bold">Luogo</span>: <a href={"https://maps.google.com/?q=" + props.data.imbottigliamento.luogo.split(",")[0].replace("(", "") + "," + props.data.imbottigliamento.luogo.split(",")[1].replace(")", "")}>{props.data.imbottigliamento.luogo}</a></div>
                        </Col>

                        <Col className="py-4" md={12}>
                            <MapComponent className="mx-auto" coord={props.data.imbottigliamento.luogo}></MapComponent>
                        </Col>
                    </Row>

                    <Row className="py-4 border-top">
                        <Col className="mb-2" md={4}>
                            <h5 >Trattamenti</  h5>
                        </Col>
                        <Col className="mb-2 d-flex flex-column" md={8}>
                            <div><span className="my-bold">Raccolta dati</span>: {props.data.trattamenti["raccolta dati"]}</div>
                            <div><span className="my-bold">Superficie</span>: {props.data.trattamenti.superficie}</div>
                            <div><span className="my-bold">Prodotto a base di Zolfo</span>: {props.data.trattamenti['prodotto a base di zolfo per trattamento']} per trattamento</div>
                            <div><span className="my-bold">Prodotto Rameico (30%)</span>: {props.data.trattamenti['prodotto rameico 30% per trattamento']} per trattamento</div>
                        </Col>
                    </Row>




                    <Row className="py-4 border-top">
                        <h5 className="mb-1">Date trattamenti</h5>
                        <Col md={12}>
                            { Object.keys(props.data.trattamenti).map((key) => {
                                if (key.match(/[0-9]+th|nd|st|rd/gi)) {
                                    return (
                                        <Badge bg="secondary" className="p-2 m-1" key={key}>{props.data.trattamenti[key]}</Badge>
                                    )
                                }
                                return null;
                            })
                            }
                        </Col>
                    </Row>
                </Card.Body>
                </>
        );
    } else if (props.error) {
        // se ci sono errori
        return (
            <>
                <Card.Header className="rounded-0">Product Data (Error)</Card.Header>
                <Card.Body className='d-flex justify-content-center align-item-center py-5'>
                    <h6 className='text-danger'>Error: {props.error}</h6>
                </Card.Body>
            </>
        );
    } else {
        // Se non ci sono dati
        return (
            <>
                <Card.Header className="rounded-0">Product Data (Fetching...)</Card.Header>
                <Card.Body className='d-flex justify-content-center align-item-center py-5'>
                    <FontAwesomeIcon size="xl" className="opacity-50" icon={faCircleNotch} spin></FontAwesomeIcon>
                </Card.Body>
            </>
        );
    }
}

export default InfoContainer;
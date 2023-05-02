import {useLocation} from "react-router-dom";
import {Breadcrumb, Col, Row} from "antd";


export const Breadcrumbs = () => {
    const {pathname} = useLocation();
    const paths = pathname.split("/");
    const geBreadcrumb = () => {
        for (const path of paths) {
            return <Breadcrumb.Item>{path}</Breadcrumb.Item>
        }
    }
    return (
        <>
            <Row>
                <Col span={12}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        {/*{geBreadcrumb}*/}
                        <Breadcrumb.Item>{paths[1]}</Breadcrumb.Item>
                        {paths[2] !== undefined ? <Breadcrumb.Item>{paths[2]}</Breadcrumb.Item> : null}
                        {paths[3] !== undefined ? <Breadcrumb.Item>{paths[3]}</Breadcrumb.Item> : null}
                    </Breadcrumb>
                </Col>
                <Col span={12} >
                    {/*<Breadcrumb style={{margin: '16px 0'}}>*/}
                    {/*    <Breadcrumb.Item> {new Date().toLocaleDateString()}</Breadcrumb.Item>*/}
                    {/*</Breadcrumb>*/}

                </Col>
            </Row>
        </>


    )

}

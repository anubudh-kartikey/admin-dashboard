import {Card, Col, Row, Statistic} from 'antd';
import CountUp from 'react-countup';
import {ArrowDownOutlined, ArrowUpOutlined} from "@ant-design/icons";

const formatter = (value) => <CountUp end={value} separator=","/>;
const Home = () => (
    <>
        <Row gutter={16}>
            <Col span={6}>
                <Statistic title="Total Users" value={11289} formatter={formatter}/>
            </Col>
            <Col span={6}>
                <Statistic title="Active Users" value={10050} precision={2} formatter={formatter}/>
            </Col>
        </Row>
        <Row gutter={16}>
            <Col span={6}>
                <Statistic title="Total Roles" value={1520} formatter={formatter}/>
            </Col>
            <Col span={6}>
                <Statistic title="Unassigned Roles" value={630} precision={2} formatter={formatter}/>
            </Col>

        </Row>
        <Row gutter={16}>
            <Col span={6}>
                <Statistic title="Total Permissions" value={9520} formatter={formatter}/>
            </Col>
            <Col span={6}>
                <Statistic title="Unassigned Permission" value={257} formatter={formatter}/>
            </Col>

        </Row>
        <Row gutter={16}>
            <Col span={6}>
                <Card bordered={false}>
                    <Statistic
                        title="Traffic"
                        value={60.28}
                        precision={2}
                        valueStyle={{color: '#3f8600'}}
                        prefix={<ArrowUpOutlined/>}
                        suffix="%"
                    />
                </Card>
            </Col>
            <Col span={6}>
                <Card bordered={false}>
                    <Statistic
                        title="App Load"
                        value={9.3}
                        precision={2}
                        valueStyle={{color: '#cf1322'}}
                        prefix={<ArrowDownOutlined/>}
                        suffix="%"
                    />
                </Card>
            </Col>
        </Row>
    </>
);
export default Home;
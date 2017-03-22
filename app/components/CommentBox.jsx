import axios from 'axios';
import React from 'react';
import en1 from '../../locale-data/en.json';
import fr1 from '../../locale-data/fr.json';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl';
import { Table, Icon, Card, Input, Button } from 'antd';
addLocaleData([...en, ...fr]);

/**
 * A counter button: tap the button to increase the count.
 */
class CommentBox extends React.Component {
    constructor() {
        super();
        this.state = {
            comment: "",
        };
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }

    onSubmit() {
        axios.post('/api/addComment/', {
            name: 'jack',
            msg: this.state.comment
        }).then(function (response) {
            console.log(response);
        })
    }

    render() {
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'Comment',
            dataIndex: 'comment',
            key: 'comment',
        }];

        const data = [{
            name: 'John Brown',
            comment: ' New York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake Park jrioleflsndskjn',
        }, {
            name: 'Jim Green',
            comment: 'London No. 1 Lake Park',
        }, {
            name: 'Joe Black',
            comment: 'Sidney No. 1 Lake Park',
        }, {
            name: 'Joe Black',
            comment: 'Sidney No. 1 Lake Park',
        }];

        var tab = fr1
        return (
            <IntlProvider locale='fr' messages={fr1} >
                <div style={{marginTop: 30}}>
                    <Card title={tab.comments} >
                        {/*<Card title="Maxime">*/}
                            {/*Good movie lol*/}
                        {/*</Card>*/}
                        {/*<br />*/}
                        {/*<Card title="Nathan" >*/}
                            {/*<p>I like to mve it</p>*/}
                        {/*</Card>*/}
                        <Input type="textarea"
                               placeholder="Type your comment..."
                               autosize={{ minRows: 2 }}
                               style={{ display: 'inline-block', width: '70%'}}
                               name="comment"
                               value={this.state.comment}
                               onChange={this.handleChange.bind(this)}
                        />
                        <Button type="primary" onClick={this.onSubmit.bind(this)}>Primary</Button>
                        <Table columns={columns} dataSource={data} pagination={false} showHeader={false} />
                    </Card>
                </div>
            </IntlProvider>
        );
    }
}
export default CommentBox;

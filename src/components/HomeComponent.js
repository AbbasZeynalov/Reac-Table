import React, { Fragment } from 'react';
import {
    Table,
    Input,
    Radio,
    Form
} from "antd";
import PropTypes from 'prop-types';

const Search = Input.Search;
const FormItem = Form.Item;

const HomeComponent = (props) => {

    return (
        <Fragment>
            <FormItem label="Size">
                <Radio.Group size="default" value={props.size} onChange={props.handleSizeChange}>
                    <Radio.Button value="default">Default</Radio.Button>
                    <Radio.Button value="middle">Middle</Radio.Button>
                    <Radio.Button value="small">Small</Radio.Button>
                </Radio.Group>
            </FormItem>
            <Search
                placeholder="input search text"
                onSearch={props.onSearch}
                size="large"
            />
            <Table
                size={props.size}
                rowKey={record => record.id}
                columns={props.columns}
                dataSource={props.dataSource}
                loading={props.loading}
            />;
        </Fragment>
    );
};

HomeComponent.propTypes = {
    onSearch: PropTypes.func.isRequired,
    handleSizeChange: PropTypes.func.isRequired,
    columns: PropTypes.array.isRequired,
    dataSource: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    size: PropTypes.string.isRequired,
};

export default HomeComponent;
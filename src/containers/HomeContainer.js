import React from 'react';
import { connect } from 'react-redux';

import {
    Input,
    Button,
    Icon
} from 'antd';

import Highlighter from 'react-highlight-words';
import { getPosts, filterPosts } from "../actions/posts";
import HomeComponent from '../components/HomeComponent';
import PostService from '../services/postService';

class HomeContainer extends React.Component {

    constructor(props) {
        super(props);

        this.posts = [];

        this.onSearch = this.onSearch.bind(this);
        this.handleSizeChange = this.handleSizeChange.bind(this);
    }
    state = {
        size: 'default',
        loading: true,
        searchText: '',
    };

    onSearch(value) {

        this.props.filterPosts(value, this.posts);
    }

    handleSizeChange = (e) => {

        this.setState({
            size: e.target.value
        });
    }

    componentDidMount() {
        PostService()
            .then( res => {

                this.posts = res.data;
                this.props.getPosts(res.data)

                this.setState({
                    loading: false
                })
            })
            .catch( err => {
                console.log(err)
            });;
    }

    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
                             setSelectedKeys, selectedKeys, confirm, clearFilters,
                         }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => { this.searchInput = node; }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button
                    onClick={() => this.handleReset(clearFilters)}
                    size="small"
                    style={{ width: 90 }}
                >
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: (text) => (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        ),
    })

    render() {
        const columns = [{
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '10%',
            sorter: (a, b) => {
                if(a.id < b.id) { return -1; }
                if(a.id > b.id) { return 1; }
                return 0;
            },
            ...this.getColumnSearchProps('id'),
        }, {
            title: 'User ID',
            dataIndex: 'userId',
            key: 'userId',
            width: '10%',
            sorter: (a, b) => {
                if(a.userId < b.userId) { return -1; }
                if(a.userId > b.userId) { return 1; }
                return 0;
            },
            ...this.getColumnSearchProps('userId'),
        }, {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: '40%',
            sorter: (a, b) => {
                if(a.title < b.title) { return -1; }
                if(a.title > b.title) { return 1; }
                return 0;
            },
            ...this.getColumnSearchProps('title'),
        }, {
            title: 'Body',
            dataIndex: 'body',
            key: 'body',
            width: '40%',
            sorter: (a, b) => {
                if(a.body < b.body) { return -1; }
                if(a.body > b.body) { return 1; }
                return 0;
            },
            ...this.getColumnSearchProps('body'),
        }];

        return (
            <HomeComponent
                columns={columns}
                dataSource={Object.values(this.props.posts)}
                onSearch={this.onSearch}
                handleSizeChange={this.handleSizeChange}
                loading={this.state.loading}
                size={this.state.size}
            />
        )
    }

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    }

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        getPosts: (posts) => dispatch(getPosts(posts)),
        filterPosts: (value, posts) => dispatch(filterPosts(value, posts))

    }
};

const mapStateToProps = (state) => {

    return {
        posts: state.posts.data || []
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
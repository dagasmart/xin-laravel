import { XinTableColumn } from '@/components/Xin/XinTable/typings';
import { IDept } from '@/domain/iDept';
import XinTable from '@/components/Xin/XinTable';
import { listApi } from '@/services/common/table';
import React, { useState } from 'react';
import { Button } from 'antd';

export default () => {

  const columns: XinTableColumn<IDept>[] = [
    { title: '部门ID', dataIndex: 'dept_id', hideInForm: true, hideInTable: true, },
    { title: '部门名称', dataIndex: 'name', valueType: 'text', },
    { title: '排序', dataIndex: 'sort', valueType: 'digit', },
    { title: '状态', dataIndex: 'status', valueType: 'radio',
      valueEnum: {
        1: { text: '禁用', status: 'Error' },
        0: { text: '启用', status: 'Success' },
      },
    },
    {
      title: '上级部门',
      dataIndex: 'parent_id',
      valueType: 'treeSelect',
      initialValue: 1,
      hideInTable: true,
      request: async  () => {
        let data = await listApi('/admin/dept');
        return data.data.data
      },
      fieldProps: { fieldNames: { label: 'name', value: 'dept_id' } }
    },
    { title: '部门负责人', dataIndex: 'leader', valueType: 'text', },
    { title: '部门邮箱', dataIndex: 'email', valueType: 'text', },
    { title: '部门电话', dataIndex: 'phone', valueType: 'text', },
    { title: '创建时间', dataIndex: 'created_at', valueType: 'fromNow', hideInForm: true },
    { title: '更新时间', dataIndex: 'updated_at', valueType: 'fromNow', hideInForm: true }
  ];

  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
  const [allKeys, setAllKeys] = useState([]);
  const collectKeys = (data: IDept[]) => {
    let keys: any = [];
    data.forEach((item) => {
      keys.push(item.dept_id);
      if (item.children) {
        keys = keys.concat(collectKeys(item.children));
      }
    });
    return keys;
  };


  return (
    <XinTable<IDept>
      api={'/admin/dept'}
      rowKey={'dept_id'}
      columns={columns}
      accessName={'admin.dept'}
      toolBarRender={[
        <Button onClick={() => setExpandedRowKeys(allKeys)}>
          展开全部
        </Button>,
        <Button onClick={() => setExpandedRowKeys([])}>
          折叠全部
        </Button>
      ]}
      editShow={(i) => i.dept_id !== 1}
      deleteShow={(i) => i.dept_id !== 1}
      tableProps={{
        search: false,
        headerTitle: '部门管理',
        postData: (data: IDept[]) => {
          let keys = collectKeys(data);
          setAllKeys(keys);
          setExpandedRowKeys(keys);
          return data;
        },
        toolbar: { settings: []},
        expandable: {
          expandRowByClick: true,
          expandedRowKeys: expandedRowKeys,
          onExpandedRowsChange: (expandedKeys) => {
            console.log(expandedKeys);
            setExpandedRowKeys([...expandedKeys])
          }
        }
      }}
    />
  )
}

/*
使用mockjs提供mock数据接口
 */
import Mock from 'mockjs'
import data from './data.json'

// 返回首页的接口
Mock.mock('/index', {code:0, data})



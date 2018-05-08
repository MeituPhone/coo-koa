/**
 * 信息类常量
 * Created by 王佳欣 on 2018/4/28.
 */

 
const CREATE_ERROR = {
    code: 6001,
    msg: 'Incorrect create.'
};


const UPDATE_ERROR = {
    code: 6002,
    msg: 'Incorrect update.'
};

const REMOVE_ERROR = {
    code: 6003,
    msg: 'Incorrect remove.'
};

//用户已存在
const USER_EXIST_ERROR= {
    code :6004,
    msg: 'user aleady exists'
}

//用户不存在
const USER_NOT_EXIST_ERROR= {
    code :6005,
    msg: 'user does not exist'
}

const TOKEN_ERROR = {
    code: 7001,
    msg: 'Incorrect token.'
};

const PASSWORD_ERROR = {
    code: 7002,
    msg: 'Incorrect password.'
};

const NAME_ERROR = {
    code: 7004,
    msg: 'Incorrect name.'
};

const PARAMETER_ERROR = {
    code: 10000,
    msg: 'Incorrect parameter'
}

export default {
    CREATE_ERROR,
    UPDATE_ERROR,
    REMOVE_ERROR,
    TOKEN_ERROR,

    USER_EXIST_ERROR,
    USER_NOT_EXIST_ERROR,
    
    PASSWORD_ERROR,
    NAME_ERROR,
    
    /**
     * @description 参数错误
     */
    PARAMETER_ERROR
};

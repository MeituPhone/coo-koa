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

const EXIST_ERROR = {
    code: 6004,
    msg: 'Resources alrady exists'
}

const NO_FOUND_ERROR = {
    code: 6005,
    msg: 'Resources no found'
}


const PARAMETER_ERROR = {
    code: 7000,
    msg: 'Incorrect parameter'
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
    code: 7003,
    msg: 'Incorrect name.'
};

export default {
    CREATE_ERROR,
    UPDATE_ERROR,
    REMOVE_ERROR,
    EXIST_ERROR,
    NO_FOUND_ERROR,

    TOKEN_ERROR,

    PASSWORD_ERROR,
    NAME_ERROR,

    /**
     * @description 参数错误
     */
    PARAMETER_ERROR,
};

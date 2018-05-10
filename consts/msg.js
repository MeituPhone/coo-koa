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
const USER_EXIST_ERROR = {
    code: 6004,
    msg: 'user aleady exists'
}

//用户不存在
const USER_NOT_EXIST_ERROR = {
    code: 6005,
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
    code: 8000,
    msg: 'Incorrect parameter'
}

//题库

//题目不存在
const QUESTION_NOT_EXIST_ERROR = {
    code: 9000,
    msg: 'question dose not exists'
}

//试卷

//试卷不存在
const EXAMINATION_NOT_EXIST_ERROR = {
    code: 9001,
    msg: 'examination dose not exists'
}

//文章

//文章不存在
const ARTICLE_NOT_EXIST_ERROR = {
    code: 9002,
    msg: 'article dose not exists'
}

const ARTICLE_TYPE_EXIST_ERROR = {
    code: 9003,
    msg: 'article type already exists'
}

const ARTICLE_TAG_EXIST_ERROR = {
    code: 9004,
    msg: 'article tag already exists'
}

const ARTICLE_TYPE_NOT_EXIST_ERROR= {
    code: 9005,
    msg: 'article type dose not exists'
}

const ARTICLE_TAG_NOT_EXIST_ERROR = {
    code: 9006,
    msg: 'article tag dose not exists'
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
    PARAMETER_ERROR,

    QUESTION_NOT_EXIST_ERROR,

    EXAMINATION_NOT_EXIST_ERROR,

    ARTICLE_NOT_EXIST_ERROR,
    ARTICLE_TAG_EXIST_ERROR,
    ARTICLE_TAG_NOT_EXIST_ERROR,
    ARTICLE_TYPE_EXIST_ERROR,
    ARTICLE_TYPE_NOT_EXIST_ERROR
};

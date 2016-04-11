/**
 * cookie operation
 *
 *
 */
function storeTokenIntoCookie(token)
{
    document.cookie = TOKEN_NAME + '=' + token;
}

function getTokenFromCookie()
{
    var token = '';
    var strCookie=document.cookie; 
    var arrCookie=strCookie.split("; "); 
    for(var i=0;i<arrCookie.length;i++){ 
        var arr=arrCookie[i].split("="); 
        if(TOKEN_NAME == arr[0] && arr[1].length > 0){ 
            token=arr[1]; 
            break; 
        } 
    } 
    return token;
}

function deleteTokenFromCookie()
{
    document.cookie = TOKEN_NAME + '=' + '; expires=Thu, 01 Jan 1970 00:00:01 GMT';
}


/**
 * used for ajax
 *
 *
 */

function ajaxGet(des_url, get_data)
{
    var result = {};
    $.ajax({
        url: KT + des_url,
        data: get_data,
        async: false,
        success: function(data) {
            result.success = true;
            result.data = data;
        },
        error: function(data) {
            result.success = false;
            result.error = data;
        }
    });
    return result;
}

function ajaxPost(des_url, post_data)
{
    var result = {};
    $.ajax({
        url: KT + des_url,
        method: 'POST',
        data: post_data,
        async: false,
        success: function(data) {
            result.success = true;
            result.data = data;
        },
        error: function(data) {
            result.success = false;
            result.error = data;
        }
    });
    return result;
}

function ajaxPut(des_url, put_data)
{
    var result = {};
    $.ajax({
        url: KT + des_url,
        method: 'PUT',
        data: put_data,
        async: false,
        success: function(data) {
            result.success = true;
            result.data = data;
        },
        error: function(data) {
            result.success = false;
            result.error = data;
        }
    });
    return result;
}

function ajaxDelete(des_url, delete_data)
{
    var result = {};
    $.ajax({
        url: KT + des_url,
        method: 'DELETE',
        data: put_data,
        async: false,
        success: function(data) {
            result.success = true;
            result.data = data;
        },
        error: function(data) {
            result.success = false;
            result.error = data;
        }
    });
    return result;
}

function ajaxGetWithToken(des_url, get_data)
{
    var result = {};
    var token = getTokenFromCookie();
    $.ajax({
        url: KT + des_url,
        data: get_data,
        beforeSend: function(request) {
            request.setRequestHeader('Authorization', 'Bearer{' + token + '}');
        },
        async: false,
        success: function(data) {
            result.success = true;
            result.data = data;
        },
        error: function(data) {
            result.success = false;
            result.error = data;
        }
    });
    return result;
}

function ajaxPostWithToken(des_url, post_data)
{
    var result = {};
    var token = getTokenFromCookie();
    $.ajax({
        url: KT + des_url,
        method: 'POST',
        data: post_data,
        beforeSend: function(request) {
            request.setRequestHeader('Authorization', 'Bearer{' + token + '}');
        },
        async: false,
        success: function(data) {
            result.success = true;
            result.data = data;
        },
        error: function(data) {
            result.success = false;
            result.error = data;
        }
    });
    return result;
}

function ajaxPutWithToken(des_url, put_data)
{
    var result = {};
    var token = getTokenFromCookie();
    $.ajax({
        url: KT + des_url,
        method: 'PUT',
        data: put_data,
        beforeSend: function(request) {
            request.setRequestHeader('Authorization', 'Bearer{' + token + '}');
        },
        async: false,
        success: function(data) {
            result.success = true;
            result.data = data;
        },
        error: function(data) {
            result.success = false;
            result.error = data;
        }
    });
    return result;
}

function ajaxDeleteWithToken(des_url, delete_data)
{
    var result = {};
    var token = getTokenFromCookie();
    $.ajax({
        url: KT + des_url,
        method: 'DELETE',
        data: put_data,
        beforeSend: function(request) {
            request.setRequestHeader('Authorization', 'Bearer{' + token + '}');
        },
        async: false,
        success: function(data) {
            result.success = true;
            result.data = data;
        },
        error: function(data) {
            result.success = false;
            result.error = data;
        }
    });
    return result;
}

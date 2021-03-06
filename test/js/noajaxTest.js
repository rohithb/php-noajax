var assert = chai.assert;
describe('NoAjax', function(){
    beforeEach(function(){
        noajax.init({
            serverEndpoint: 'http://localhost.dev/no-ajax-server-php/src/noajax.php',
            serverNamespace: 'noAjax\\test\\'
        });
    });
    it('Should return result for function without any argument', function(done){
        noajax.call("helperMethods\\NoAjaxClass::returnSuccess", function(err,res){
            try{
                assert.equal(res, 'success');
                done();
            }catch(e){
                done(e);
            }
        });
    });
    it('Should return true for server method does not return anything', function(done){
        noajax.call("helperMethods\\NoAjaxClass::returnNothing", function(err,res){
            try{
                assert.isTrue(res);
                done();
            }catch(e){
                done(e);
            }
        });
    });
    it('Should accept 2 string arguments and return concatenated string', function(done){
        noajax.call("helperMethods\\NoAjaxClass::concatenateString", "hello", "world", function(err, res){
            try{
                assert.equal(res, "helloworld");
                done();
            }catch(e){
                done(e);
            }
        });
    });
    it('Should accept 3 integers and return sum of them', function(done){
        noajax.call("helperMethods\\NoAjaxClass::add3Numbers",1, 2, 3, function(err, res){
            try{
                assert.strictEqual(res, 6);
                done();
            }catch(e){
                done(e);
            }
        });
    });
    it('Should return ArgumentMismatch exception if 2 arguments are required and only one is given',function(done){
        noajax.call("helperMethods\\NoAjaxClass::add3Numbers", 1, 2, function(err, res){
            try{
                assert.equal(err.name, 'noAjax\\Exception\\ArgumentMismatchException');
                done();
            }catch(e){
                done(e);
            }
        });
    });
    it('Should return NoMethodFound Exception if server method is not found',function(done){
        noajax.call("helperMethods\\NoAjaxClass::nonExistingFunction", function(err,res){
            try{
                assert.equal(err.name, 'noAjax\\Exception\\MethodNotFoundException');
                done();
            }catch(e){
                done(e);
            }
        });
    });
});
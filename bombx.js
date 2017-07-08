var mbmob;

mbmob = function() {
  return this.name = "bmomb";
};

//初始化，ka:Application ID，kb:REST API Key，misa:表单名称，应最先使用
mbmob.init = function(ka, kb, misa) {
  Bmob.initialize(ka, kb);
  mbmob.ac = Bmob.Object.extend(misa);//misa，表单名称
  return mbmob.acs = new mbmob.ac();
};

//添加数据，wo键名，va键值
mbmob.set = function(wo, va) {
  mbmob.acs.set(wo, va);
  return mbmob.acs.save({
    success: (function(_this) {
      return function(co) {
        return alert("(" + va + ") send ok");
      };
    })(this)
  });
};

//查询所有数据，默认返回十条数据
mbmob.re = function() {
  mbmob.acq = new Bmob.Query(mbmob.ac);
  mbmob.acq.find({
    success: (function(_this) {
      return function(res) {
        recname=new Array();
        reccode=new Array();
        var rea, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = res.length; _i < _len; _i++) {
          rea = res[_i];
          //
          mbmob.deal(rea.get("name"),rea.get("code"));
          /*在此获取数据并进行操作*/
          //
        }
        getafile("default");
        recname.forEach(function(e){
          var a=$("<tbody>");
          const b=e;
          a.html("<tr><td>"+e+"</td></tr>");
          a.bind("click",function(){
            getafile(b);
          });
          $("#filelist").empty().html("<tbody><tr><td>filename</td></tr></tbody>");
          a.appendTo($("#filelist"));
        });
        return _results;
      };
    })(this),
    erro: (function(_this) {
      return function(erro) {
        return console.log(erro.code);
      };
    })(this)
  });
  return 0;
};

mbmob.deal = function(name,code) {
  rec.push({"name":name,"code":code});
  recname.push(name);
  reccode.push(code);
  return 0;
};

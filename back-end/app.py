from flask_sqlalchemy import SQLAlchemy
from flask_restful import reqparse, abort, Api, Resource
from flask import Flask, request
from flask_cors import CORS

# 创建Flask实例
app = Flask(__name__)

# cors实例
CORS(app)

# 创建orm实例
db = SQLAlchemy()

# 解析器
parser = reqparse.RequestParser()
parser.add_argument('')

# 创建连接参数
USERNAME = ''
PASSWORD = ''
HOST = ''
PORT = ''
DATABASE = ''
DbUrl = "mysql+pymysql://{}:{}@{}:{}/{}?charset=utf8".format(
    USERNAME, PASSWORD, HOST, PORT, DATABASE)

# app配置信息
app.config['SQLALCHEMY_DATABASE_URI'] = DbUrl
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = False
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# 初始化app
db.app = app
db.__init__(app)
api = Api(app)

# 标签类


class MarkObj(dict):
    def __init__(self, id, title, url, genre):
        dict.__init__(self, id=id,
                      title=title,
                      url=url,
                      genre=genre)

# 分类类


class GenreObj(dict):
    def __init__(self, genre):
        dict.__init__(self, genre=genre)

# 创建、连接标签模型


class Mark(db.Model):
    __tablename__ = 'mark'
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    genre = db.Column(db.String(20), nullable=False)

# 删除标签、获取单个标签


class Marks(Resource):
    # 按分类获取标签
    def get(self, mark_genre):
        results = db.session.query(Mark).filter(Mark.genre == mark_genre)
        if results == None:
            abort(404, message="未找到此标签")
        marks = []
        for result in results:
            mark = MarkObj(result.id, result.title, result.url, result.genre)
            marks.append(mark)
        return marks, 200

    # 删除标签
    def delete(self, mark_id):
        result = db.session.query(Mark).filter(Mark.id == mark_id).first()
        if result == None:
            abort(404, message="未找到此标签")
        db.session.delete(result)
        db.session.commit()
        return '', 204

    # 更新标签
    def post(self, mark_id):
        result = db.session.query(Mark).filter(Mark.id == mark_id).first()
        if result == None:
            abort(404, message="未找到此标签")
        _title = request.args.get('title')
        _url = request.args.get('url')
        _genre = request.args.get('genre')
        result.title = _title
        result.url = _url
        result.genre = _genre
        db.session.add(result)
        db.session.commit()
        return '', 200


class MarkList(Resource):
    # 获取所有标签
    def get(self):
        results = Mark.query.all()
        marks = []
        for result in results:
            mark = MarkObj(result.id, result.title, result.url, result.genre)
            marks.append(mark)
        return marks, 200

    # 新增标签
    def post(self):
        _title = request.args.get('title')
        _url = request.args.get('url')
        _genre = request.args.get('genre')
        mark = Mark(title=_title, url=_url, genre=_genre)
        db.session.add(mark)
        db.session.commit()
        return '', 200


class Genres(Resource):
    def get(self):
        results = db.session.query(Mark.genre).distinct()
        genres = []
        for result in results:
            genre = GenreObj(result.genre)
            genres.append(genre)
        return genres, 200


# restful api
api.add_resource(Marks, '/marks/<mark_genre>')
api.add_resource(MarkList, '/marks')
api.add_resource(Genres, '/genres')

@app.route('/crash')
def main():
    raise Exception()

# 启动flask服务器
if __name__ == '__main__':
    app.run(debug=True)

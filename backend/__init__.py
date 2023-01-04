import requests as req
from bs4 import BeautifulSoup
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = 'kuhaku2022'

CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route('/', methods=['GET'])
def index():
    return jsonify({
        'status': 'success',
    })

@app.route('/api/anime/op_home', methods=['GET', 'POST'])
def op_home():
    if request.method == 'GET':
        url = "https://oploverz.co.in"
        home_page = req.get(url)

        soup = BeautifulSoup(home_page.text, "html.parser")

        list_hot_update = []
        list_latest_updated = []
        list_recomendation = []

        styleegg_articles = soup.find_all('article', class_='bs styleegg')
        stylesix_articles = soup.find_all('article', class_='stylesix')
        series_gen = soup.find('div', class_='series-gen')
        listupd = series_gen.find('div', class_='listupd')
        series_gen_a = listupd.find_all('a')

        for item_styleegg in styleegg_articles:
            h2 = item_styleegg.find('h2')
            img = item_styleegg.find('img')
            a = item_styleegg.find('a')
            title = h2.text
            list_hot_update.append(
                {'title': title, 'image': img['src'], 'url': a['href']})

        for item_stylesix in stylesix_articles:
            h2 = item_stylesix.find('h2')
            img = item_stylesix.find('img')
            a = item_stylesix.find('a')
            scr = item_stylesix.find('span', class_='scr')
            title = h2.text
            if(scr != None):
                score = scr.text
            else:
                score = ''
            li = item_stylesix.find_all('li')
            info = []
            for item_li in li:
                if 'Posted' not in item_li.text:
                    info.append(item_li.text.capitalize())
            list_latest_updated.append(
                {'title': title, 'image': img['src'], 'url': a['href'], 'score': score, 'info': info})

        for item_series_gen_a in series_gen_a:
            h2 = item_series_gen_a.find('h2')
            img = item_series_gen_a.find('img')
            epx = item_series_gen_a.find('span', class_='epx')
            image = img['src']
            status = epx.text
            title = h2.text
            list_recomendation.append(
                {'title': title, 'image': image, 'url': item_series_gen_a['href'], 'status': status})                
        hpage = soup.find('div', class_='hpage')
        navigate = []
        a = hpage.find_all('a')
        for item_a in a:
            navigate.append({'title': item_a.text, 'url': item_a['href']})

        return jsonify({
            'status': True,
            'response': {'hot': list_hot_update, 'latest': list_latest_updated, 'navigate': navigate, 'recomendation': list_recomendation}
        })
    if request.method == 'POST':
        url = request.form.get('url')
        home_page = req.get(url)

        soup = BeautifulSoup(home_page.text, "html.parser")

        list_hot_update = []
        list_latest_updated = []
        list_recomendation = []

        styleegg_articles = soup.find_all('article', class_='bs styleegg')
        stylesix_articles = soup.find_all('article', class_='stylesix')

        for item_styleegg in styleegg_articles:
            h2 = item_styleegg.find('h2')
            img = item_styleegg.find('img')
            a = item_styleegg.find('a')
            title = h2.text
            list_hot_update.append(
                {'title': title, 'image': img['src'], 'url': a['href']})

        for item_stylesix in stylesix_articles:
            h2 = item_stylesix.find('h2')
            img = item_stylesix.find('img')
            a = item_stylesix.find('a')
            scr = item_stylesix.find('span', class_='scr')
            title = h2.text
            score = scr.text
            li = item_stylesix.find_all('li')
            info = []
            for item_li in li:
                if 'Posted' not in item_li.text:
                    info.append(item_li.text.capitalize())
            list_latest_updated.append(
                {'title': title, 'image': img['src'], 'url': a['href'], 'score': score, 'info': info})

        for item_series_gen_a in series_gen_a:
            h2 = item_series_gen_a.find('h2')
            img = item_series_gen_a.find('img')
            epx = item_series_gen_a.find('span', class_='epx')
            image = img['src']
            status = epx.text
            title = h2.text
            list_recomendation.append(
                {'title': title, 'image': img['src'], 'url': a['href'], 'status': status})                
        
        hpage = soup.find('div', class_='hpage')
        navigate = []
        a = hpage.find_all('a')
        for item_a in a:
            navigate.append({'title': item_a.text, 'url': item_a['href']})

        return jsonify({
            'status': True,
            'response': {'hot': list_hot_update, 'latest': list_latest_updated, 'navigate': navigate, 'recomendation': list_recomendation}
        })


@app.route('/api/anime/op_episode', methods=['POST'])
def op_episode():
    url = request.form.get('url')

    detail_page = req.get(url)

    soup = BeautifulSoup(detail_page.text, 'html.parser')

    player_embed = soup.find('div', class_='player-embed')
    iframe = player_embed.find('iframe')
    entry_title = soup.find('h1', class_='entry-title')
    naveps = soup.find('div', class_='naveps')
    nvs = naveps.find_all('div', class_='nvs')
    title = entry_title.text

    navbar_episodes = []
    for nvs_item in nvs:
        a = nvs_item.find('a')
        if a != None:
            navbar_episodes.append({'title': a.text, 'url': a['href']})

    list_url_download = []
    soraddlx = soup.find_all('div', class_='soraddlx')
    for item_soraddlx in soraddlx:
        ekstensi = item_soraddlx.find('h3').text
        soraurlx = item_soraddlx.find_all('div', 'soraurlx')
        list_url = []
        for item_soraurlx in soraurlx:
            resolusi = item_soraurlx.find('strong').text
            a = item_soraurlx.find_all('a')
            list_a_soraurlx = []
            for item_a in a:
                list_a_soraurlx.append(
                    {'url': item_a['href'], 'server': item_a.text})
            list_url.append(
                {'list_server': list_a_soraurlx, 'resolusi': resolusi})

        list_url_download.append(
            {'ekstensi': ekstensi, 'master': list_url})

    listupd = soup.find('div', class_='listupd')
    a = listupd.find_all('a')
    list_rekomendasi_anime = []
    for item_a in a:
        h2 = item_a.find('h2')
        img = item_a.find('img')
        title_anime = h2.text
        list_rekomendasi_anime.append(
            {'title': title_anime, 'image': img['src'], 'url': item_a['href']})
    return jsonify({
        'status': True,
        'response': {'title': title, 'url_streaming': iframe['src'], 'download': list_url_download, 'list_rekomendasi_anime': list_rekomendasi_anime, 'navbar_episodes': navbar_episodes}
    })


@app.route('/api/anime/op_detail', methods=['POST'])
def op_detail():
    url = request.form.get('url')

    detail_page = req.get(url)

    soup = BeautifulSoup(detail_page.text, 'html.parser')
    infox = soup.find('div', class_='infox')
    thumbook = soup.find('div', class_='thumbook')
    img = thumbook.find('img')
    rating = thumbook.find('strong').text

    h1 = infox.find('h1')
    mindesc = infox.find('div', 'mindesc')
    alter_span = infox.find('span', class_='alter')
    spe = infox.find('div', class_='spe')
    span = spe.find_all('span')
    genxed = infox.find('div', class_='genxed')
    a = genxed.find_all('a')
    desc = infox.find('div', class_='desc')

    title = h1.text
    min_description = mindesc.text.replace('oploverz.asia', 'oniime.com').replace(
        'Oploverz', 'Oniime').replace('oploverz', 'oniime')
    description = desc.text.replace('oploverz.asia', 'oniime.com').replace(
        'Oploverz', 'Oniime').replace('oploverz', 'oniime')
    if alter_span != None:
        alter = alter_span.text
    else:
        alter = ''
    info = []
    for span_item in span:
        if 'Posted' not in span_item.text:
            info.append(span_item.text)
    genre = []
    for a_item in a:
        genre.append({'url': a_item['href'], 'title': a_item.text})

    bixbox = soup.find('div', class_='bixbox bxcl epcheck')
    lastend = bixbox.find('div', class_='lastend')
    a_lastend = lastend.find_all('a')
    li_episode = bixbox.find_all('li')

    firstandlast = []
    for item_a in a_lastend:
        span = item_a.find('span', class_='epcur')
        title = span.text
        firstandlast.append({'url': item_a['href'], 'title': title})

    list_of_episode = []
    for li_item in li_episode:
        a = li_item.find('a')
        title = li_item.find('div', class_='epl-title').text
        list_of_episode.append({'url': a['href'], 'title': title})
    return jsonify({
        'status': True,
        'response': {
            'title': title,
            'image': img['src'],
            'rating': rating,
            'min_desc': min_description,
            'desc': description,
            'alter': alter,
            'info': info,
            'genre': genre,
            'first_and_last': firstandlast,
            'list_of_episodes': list_of_episode,
        }
    })


@app.route('/api/anime/op_search', methods=['POST'])
def anime_search():
    query = request.form.get('query')
    home_page = req.get('https://oploverz.co.in/?s={}'.format(query))

    soup = BeautifulSoup(home_page.text, "html.parser")

    listupd = soup.find('div', class_="listupd")
    search_result = []
    a = listupd.find_all('a')
    for a_item in a:
        h2 = a_item.find('h2')
        epx = a_item.find('span', class_='epx')
        img = a_item.find('img')
        status = epx.text
        title = h2.text
        search_result.append(
            {'url': a_item['href'], 'title': title, 'image': img['src'], 'statuc': status})

    return jsonify({
        'status': True,
        'response': search_result,
    })


@app.route('/api/anime/op_genres', methods=['POST'])
def anime_genres():
    url = request.form.get('url')
    genre_page = req.get(url)
    soup = BeautifulSoup(genre_page.text, 'html.parser')

    genre_result = []
    listupd = soup.find('div', class_="listupd")
    releases = soup.find('div', class_="releases")
    pagination = soup.find('div', class_="pagination")
    h1 = releases.find('h1')
    a = listupd.find_all('a')
    for a_item in a:
        h2 = a_item.find('h2')
        epx = a_item.find('span', class_='epx')
        img = a_item.find('img')
        status = epx.text
        title = h2.text
        genre_result.append(
            {'url': a_item['href'], 'title': title, 'image': img['src'], 'statuc': status})

    paginations = []
    a_pagination = pagination.find_all('a')
    for a_pagination_item in a_pagination:
        paginations.append({
            'title': a_pagination_item.text,
            'url': a_pagination_item['href']
        })
    title = h1.text
    return jsonify({
        'status': True,
        'response': {
            'title': title,
            'result': genre_result,
            'pagination': paginations
        },
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0')

import sys
import numpy as np
import pandas as pd 
from google_play_scraper import Sort, reviews



import json


configReviews = sys.argv[2]
configReviews = json.loads(configReviews)

# print(configReviews[0]['words'])

if sys.argv[3] == "undefined":
	result, _ = reviews(
	    'ru.sberbankmobile',
	    count=int(sys.argv[1]),
	    lang='ru', # defaults to 'en'
	    country='ru', # defaults to 'us'
	    sort=Sort.NEWEST, # defaults to Sort.MOST_RELEVANT
	)
else:
	result, _ = reviews(
	    'ru.sberbankmobile',
	    count=1,
	    lang='ru', # defaults to 'en'
	    country='ru', # defaults to 'us'
	    sort=Sort.NEWEST, # defaults to Sort.MOST_RELEVANT
	)
	result[0]["content"] = sys.argv[3]

df = pd.DataFrame(result)
df = df.drop(['reviewId'], axis=1)
# df = df.dropna()

df['content'] = df['content'].str.lower()

# df = df.sample(frac=1)
# df = df.head(50)

cols = []
for i in range(len(configReviews)):
    configReview = configReviews[i]
    tag_id = configReview["_id"]
    tag_name = configReview["tag_name"]
    words = configReview["words"].lower()
    words_not = configReview["words_not"].lower()
    
    if words_not:
    	df.loc[(df.content.str.contains(words) & (df.content.str.contains(words_not)==False)), tag_id] = 1
    else:
    	df.loc[(df.content.str.contains(words)), tag_id] = 1
    cols.append(tag_id)

df = df.fillna(0)
df[cols] = df[cols].astype(int)

# df.head(50)
json = df.to_json(orient = "records")
print(json)

# result, _ = reviews(
#     'ru.sberbankmobile',
#     count=int(sys.argv[1]),
#     lang='ru', # defaults to 'en'
#     country='ru', # defaults to 'us'
#     sort=Sort.NEWEST, # defaults to Sort.MOST_RELEVANT
# )

# df = pd.DataFrame(result)
# df = df.drop(['reviewId'], axis=1)
# df = df.dropna()

# df['content'] = df['content'].str.lower()

# df = df.sample(frac=1)
# df = df.head(50)

# df.loc[(df.content.str.contains('не появил|не дает|не отправляет|медлен|не приход|ошиб|глюк|глюч|тупит|плохо|баг|перезагру|сбой|эх|не работает|не принимает|перестал|отказывается работать|раньше все работало|раньше работало|исправьте|попытк'))& (df.content.str.contains('не глюч|не плохо|неплохо')==False), 'bugs'] = 1 баг
# df.loc[(df.content.str.contains('слетает|не возмож|не заходит|выбрас|выброс|вылетает')) & (df.content.str.contains('не вылетает')==False), 'crucials'] = 1 #критическое
# df.loc[df.content.str.contains('сложно|невозмож|не отображает|ругается|неудоб|непонятн|не видн|не прячется|не понятно|ни смс|не могу|куда делось|долгий|долго|спрятат|тормоз|стало хуже|куда исчез|было удобн|надоел|нужно переименовать|нужно перенести|нужно скрол|раздражает') & (df.content.str.contains('не тормоз|не долго')==False), 'bugs_ux'] = 1 #ошибка UX
# df.loc[df.content.str.contains('разочаров|ужас|call|оператор|робот|украл|процент|процент за кредит|процентная ставка|позор|комисси|камиc|номер 900'), 'complaints'] = 1 #претензия
# df.loc[df.content.str.contains('очень|без проблем|помогает|нареканий нет|суппер|шикарно|все ок|круто|норм|спасиб|молодц|супер|5 бал|5 звезд|устраив|замечательно|хорош|довольна|доволен|нрав|удоб|раду|отличн|клас|ставлю 5|благодар|респект') & (df.content.str.contains('не круто|не удобн|не раду|не хорош|не норм|не устраив|не очень')==False), 'compliments'] = 1 #похвала
# df.loc[(df.content.str.contains('сделайте| бы |не хватает|добавить|есть предложение|просьба|нельзя ли|предоставьте|запилите|добавьте|прошу')) & (df.content.str.contains('что бы')==False), 'features'] = 1 #фича
# df.loc[df.content.str.contains('зачем|где|вопрос|почему|как сделать|как добавить|как изменить|\?'), 'questions'] = 1 #вопрос
# df.loc[df.content.str.contains('безопасн|мошенник|мошеник|доступ'), 'vulnerabilities'] = 1 #уязвимость
# df.loc[df.content.str.contains('UPD'), 'solved'] = 1 #решено
# df.loc[df.content.str.contains('sberpay|сбер пэй|сбер pay|sber pay'), 'case_sberpay'] = 1 #case_sberpay
# df.loc[df.content.str.contains('темная тема|тёмн|темная тема|темн'), 'case_dark_theme'] = 1 #case_dark_theme
# df.loc[df.content.str.contains('qr'), 'case_qr'] = 1 #case_qr

# df = df.fillna(0)
# cols = ["bugs","crucials","bugs_ux","complaints","compliments","features","questions","vulnerabilities","solved","case_sberpay","case_dark_theme","case_qr"]
# df[cols] = df[cols].astype(int)




# pd.set_option('max_colwidth', 800)
# dfStyler = df.style.set_properties(**{'text-align': 'left'})
# dfStyler.set_table_styles([dict(selector='content', props=[('text-align', 'left')])])

# # df.head(50)
# json = df.to_json(orient = "records")

# print(json)



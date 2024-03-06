clients {
client_id int pk def(0)
name varchar(100)
email varchar(100) null unique
phone varchar(20) null
}

property_features {
feature_id int pk def(0)
property_id int > properties.property_id
feature_name varchar(100)
}

property_documents {
document_id int pk def(0)
property_id int > properties.property_id
document_name varchar(255)
document_url varchar(255)
}

properties {
property_id int pk def(0)
property_type varchar(50)
address varchar(255)
size float null
num_rooms int null
price decimal(10, 2)
status varchar(20) null def(0)
}

agents {
agent_id int pk def(0)
name varchar(100)
email varchar(100) null
phone varchar(20) null
commission_rate decimal(5, 2) null
}

property_categories {
category_id int pk def(0)
category_name varchar(100)
}

transactions {
transaction_id int pk def(0)
property_id int > properties.property_id
client_id int > clients.client_id
agent_id int > agents.agent_id
transaction_type varchar(20)
transaction_date date
price decimal(10, 2) null
}

property_images {
image_id int pk def(0)
property_id int > properties.property_id
image_url varchar(255)
}

property_category_mapping {
property_id int > properties.property_id
category_id int > property_categories.category_id
}
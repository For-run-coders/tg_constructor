create table if not exists configuration
(
    id     serial primary key,
    "name" varchar(50) not null,
    data   json        not null
);

create table if not exists action
(
    "name"      varchar(50)  primary key,
    description varchar(100) not null
);

create table if not exists action_field
(
    id          serial primary key,
    "name"      varchar(50)  not null,
    description varchar(100) not null,
    "type"      varchar(100) not null,
    action_name   varchar(50)  not null,
    constraint fk_action foreign key (action_name) references action ("name")
);

create table if not exists bot
(
    id               serial primary key,
    "name"           varchar(50) not null,
    configuration_id serial      not null,
    constraint fk_configuration foreign key (configuration_id) references configuration (id)
);

insert into configuration("name", data) values('test_bot_id', '{ "name": "test_bot_id"}')
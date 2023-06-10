create table if not exists configuration
(
    id     uuid primary key,
    "name" varchar(50),
    data   json
);

create table if not exists action
(
    id          uuid primary key,
    "name"      varchar(50),
    description varchar(100),
    data        json
);

create table if not exists bot
(
    id               uuid primary key,
    name             varchar(50),
    configuration_id uuid,
    constraint fk_configuration foreign key (configuration_id) references configuration (id)
)
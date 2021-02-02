CREATE TABLE wf_cache (id serial not null primary key, data json);

INSERT INTO wf_cache (data) values ('{"summary":{},"obs_st":[],"rapid_wind":[]}');
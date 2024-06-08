#!/bin/bash -eu

mysql=( mysql --protocol=socket -uroot -p"${MYSQL_ROOT_PASSWORD}" )

"${mysql[@]}" <<-EOSQL
    GRANT ALL ON *.* TO '${MYSQL_USER}'@'%';
EOSQL

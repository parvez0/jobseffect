CONFIG_FILES=("default.conf" "portainer.conf" "fullchain.pem" "privkey.pem")
for config in "${CONFIG_FILES[@]}";
do
  echo "Creating config file - $config"
  docker config create "$config" "./$config"
done

# Busca Ativa Escolar

Garantir que cada criança e adolescente dos 4 aos 17 anos esteja na escola – e aprendendo – é, hoje, um dos principais desafios do Brasil. Também é parte da Agenda 2030 das Nações Unidas, um conjunto de programas, ações e diretrizes que devem ser implantados por todos os países nos próximos 15 anos para alcançar o desenvolvimento sustentável.

Pensando nisso, o UNICEF, a União Nacional dos Dirigentes Municipais de Educação (Undime), o Colegiado Nacional de Gestores Municipais de Assistência Social (Congemas) e o Instituto TIM desenvolveram o Projeto de Busca Ativa de Crianças e Adolescentes. O projeto disponibiliza gratuitamente aos municípios uma ferramenta tecnológica e uma metodologia social que permitem à sociedade local (governos municipais) fazer com que isso aconteça na prática.

Como o município é o lugar no qual as políticas públicas realmente se concretizam a partir das demandas da população, é importante que os governos (municipal, estadual e federal) e as organizações da sociedade civil organizada se mobilizem para colocar na escola cada criança e adolescente que nunca estudou ou que abandonou os estudos em algum momento de sua trajetória.

O Projeto de Busca Ativa de Crianças e Adolescentes cria condições práticas para que cada comunidade se engaje pelo fim da exclusão escolar.

Batendo de porta em porta e mapeando os motivos da exclusão/evasão, vamos conseguir colocar cada uma dessas crianças e adolescentes na escola. A intenção é entender, na prática, por que isso ocorre, possibilitando a realização de políticas coordenadas de forma intersetorial para evitar que os casos voltem a se repetir.

Assinam a construção do sistema para esse projeto:

* Fundo das Nações Unidas para a Infância (UNICEF)
* União Nacional dos Dirigentes Municipais de Educação (Undime)
* Colegiado Nacional de Gestores Municipais de Assistência Social (Congemas)
* Instituto TIM

A plataforma estará em uso em diversos municipios através da url http://foradaescolanaopode.org.br

## Sobre a aplicação
Busca Ativa Escolar é uma aplicação web server-side baseada em linguagem PHP e banco de dados Postgres, com front-end em AngularJS, entre outras tecnologias e componentes, que propicia um ambiente virtual para busca, pesquisa, geolocalização e acompanhamento de caso de crianças e adolescentes que estejam em situação ausência escolar entre 04 e 17 anos de idade. A aplicação

### Documentação 
Toda documentação da aplicação está na pasta [doc](doc). Esta aplicação usa o Jekyll como engine de documentação:
- [Deploy](doc/bae_deploy.md)

### [Software] Requisitos para Instalação
Lista dos principais softwares que compõe e aplicação. Maiores detalhes, ver documentação de [instalação](doc/deploy.md) ou [guia do desenvolvedor](doc/developer_guide.md).

- [Ubuntu Server >= 16.04](http://www.ubuntu.com) ou [Debian Server >= 8](https://www.debian.org.)
- [PHP >= 5.6](http://php.net)
	- [Composer](https://getcomposer.org)
	- [Laravel = 5.3](https://laravel.com)
- [PostgreSQL >= 9.3](http://www.postgresql.org/)
- [Postgis >= 2.1](http://postgis.net)
  - [PostgreSQL-Postgis-Scripts](http://packages.ubuntu.com/trusty/misc/postgresql-9.3-postgis-2.1)
- [Node.JS >= 4.x](https://nodejs.org/en/)


### [Hardware] Requisitos para instalação

Benchmark recomendado para ambiente de produção com capacidade de gestão de até 50k registros:

*  4 cores de CPU;
* 4gb de RAM;
* 100mbit de rede;

Benchmark recomendado para ambiente de produção com capacidade de gestão de até 1m registros:

* 8 cores de CPU
* 8gb de RAM
* 500mbit de rede

Vale lembrar que os requisitos de hardware podem variar de acordo com a latência da rede, velocidade dos cores dos cpus, uso de proxies, entre outros fatores. Recomendamos aos sysadmin da rede em que a aplicação será instalada um monitoramento de tráfego e uso durante o período de 6 meses a 1 ano para avaliação de cenário de uso.


### Ambientes de desenvolvimento e teste
* URL de staging

### Licença de uso e desenvolvimento

Busca Ativa Escolar é um software livre licenciado com [GPLv3](http://gplv3.fsf.org).

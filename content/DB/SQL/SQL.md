# 1. SQL
- [[RDBMS]]의 데이터를 관리하기 위해 설계된 특수 목적의 프로그래밍 언어
- 대다수 상용 OR 공개 데이터베이스 관련 프로그램은 SQL을 표준으로 함
- 1974년 IBM의 Donald D. Chamberlin 과 Raymond F. Boyce 가 개발한 **비절차적 언어**

# 2. SQL의 구분
## 2.1. 데이터 조작 언어(Data Manipulation Language, DML)
- select
- update
- delete
- insert

## 2.2. 데이터 정의 언어(Data Definition Language, DDL)
- create database
- alter database
- create table
- alter table
- drop table
- create index
- drop index
- create, alter, drop과 database, table, index 3x3

- Union: 한 번에 여러 테이블의 데이터를 조회할 때 사용
```sql
SELECT * FROM member UNION SELECT * FROM admin;
<!-- member테이블과 admin테이블 칼럼수 불일치시 사용 불가 -->
SELECT user_id, user_pw FROM member UNION SELECT id, pw FROM admin;
```

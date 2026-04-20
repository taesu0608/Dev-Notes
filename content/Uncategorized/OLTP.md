## What is OLTP?

Online transactional processing (OLTP) enables the real-time execution of large numbers of database transactions by large numbers of people, typically over the internet.
- 많은 수의 사람에 의한 많은 수의 데이터베이스 트랜잭션을 실시간 실행이 가능하도록 한다
OLTP is what enables the rapid, accurate data processing behind ATMs and online banking, cash registers and ecommerce, and scores of other services we interact with each day.
- OLTP는 (금융거래의) 빠르고 정확한 데이터 처리를 가능하게 한다.
A database transaction is a change, insertion, deletion, or query of data in a database. OLTP systems (and the database transactions they enable) drive many of the financial transactions we make every day, including online banking and ATM transactions, e-commerce and in-store purchases, and hotel and airline bookings, to name a very few. In each of these cases, the database transaction also remains as a record of the corresponding financial transaction. OLTP can also drive non-financial database exchanges, including password changes and text messages. 
- 데이터베이스 트랜잭션은 데이터베이스에서의 변경, 삽입, 삭제 또는 조회 작업을 의미한다.
In OLTP, the common, defining characteristic of any database transaction is its _atomicity_ (or indivisibility)—a transaction either succeeds as a whole or fails (or is canceled). It cannot remain in a pending or intermediate state.
- OLTP에서 어느 데이터베이스든 일반적으로 정의되는 특징은 원자성이다.
- 
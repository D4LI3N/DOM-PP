import pyodbc

class MSSQL:
    def __init__(self, conn_str, logger):
        self.conn_str = conn_str
        self.logger = logger
        self.connection = pyodbc.connect(conn_str)

    def close(self):
        if self.connection is not None:
            self.connection.close()

    def execute(self, query, parameters=None, fetch_one=False):
        cursor = self.connection.cursor()

        try:
            if parameters:
                cursor.execute(query, parameters)
            else:
                cursor.execute(query)
        except pyodbc.OperationalError as e:
            if '[08S01]' in str(e):
                self.logger.warning("[!] DB reconnect!")
                self.connection.close()
                self.connection = pyodbc.connect(self.conn_str)
                return self.execute(query, parameters, fetch_one)
            else:
                # If it's not a communication link failure, raise the exception
                raise

        if query.lower().startswith('select'):
            if fetch_one:
                result = cursor.fetchone()
            else:
                result = cursor.fetchall()
        else:
            # For non-select queries, return the number of affected rows
            result = cursor.rowcount

        # Commit the changes for write operations
        if query.lower().startswith(('insert', 'update', 'delete')):
            self.connection.commit()

        cursor.close()
        return result


    def get_user(self, username: str, password: str):
        query = "SELECT username, djelatnik, CONCAT(ime, ' ', prezime), tel FROM sys_users WHERE username = ? AND password = ?"
        param = (username, password,)
        return self.execute(query, param, fetch_one=True)
    
    def get_userdata(self, username: str):
        query = "SELECT username, djelatnik, CONCAT(ime, ' ', prezime), tel FROM sys_users WHERE username = ? "
        param = (username, )
        return self.execute(query, param, fetch_one=True)
    
    def get_user_estates(self, oib: str):
        query = "SELECT CodeDom AS flat_id, CONCAT('(',CodeDom,') ',dom_flat.Adresa, ' ', dom_flat.Kbr) AS address FROM contacts LEFT JOIN dom_flat ON dom_flat.id = contacts.CodeDom WHERE (dateEnd IS NULL OR dateEnd = '') AND oib = ?"
        param = (oib,)
        return self.execute(query, param)
    
    def get_user_types(self, flat_ids: tuple):
        query = "SELECT DISTINCT Type,CASE WHEN Type = 'r' THEN 'Razdjelnik' WHEN Type = 'hv' THEN 'Hladna voda' WHEN Type = 'tv' THEN 'Topla voda' WHEN Type = 'k' THEN 'Kalorimetar' WHEN Type = 'p' THEN 'Plinomjer' ELSE 'Uređaj' END AS name FROM dom_meter where FlatId IN ({})".format(','.join(['?' for _ in flat_ids]))
        param = flat_ids
        return self.execute(query, param)
    
    def get_diagram_home(self, username: str, estate: str, type: str, year: str, month: str):
        query = "SELECT Mjesec, type, SUM(Potrosnja) AS TotalPotrosnja FROM dom_r JOIN dom_meter ON dom_r.MeterId = dom_meter.id WHERE dom_meter.FlatId = ? AND dom_r.Mjesec IS NOT NULL AND dom_r.Godina = ? GROUP BY Mjesec, type ORDER BY Mjesec"
        param = (estate, year,)
        return self.execute(query,param)
    
    def get_diagram_monthly_readouts(self, username: str, estate: str, type: str, year: str, month: str):
        query = "SELECT DISTINCT dm.id, dm.type, dm.Serial, dr.Mjesec, dr.Potrosnja AS CumVal FROM dom_meter AS dm JOIN dom_r AS dr ON dm.id = dr.MeterId WHERE dm.flatid = ? AND (dm.Status != '0' OR dm.Status IS NULL) AND dr.MeterId = dm.id AND dr.Godina = ? AND dm.Type = ? ORDER BY dr.Mjesec"
        param = (estate, year, type, )
        return self.execute(query,param)


"""
# Example usage:
connection_string = "your_database_connection_string"
db_handler = DatabaseHandler(connection_string)

# Example 1: Select query fetching all results
select_query_all = "SELECT * FROM your_table"
select_results_all = db_handler.execute(select_query_all)
print("Select Results (All):", select_results_all)

# Example 2: Select query fetching one result
select_query_one = "SELECT * FROM your_table WHERE id = ?"
select_parameters_one = (1,)
select_result_one = db_handler.execute(select_query_one, select_parameters_one, fetch_one=True)
print("Select Result (One):", select_result_one)

# Example 3: Insert query
insert_query = "INSERT INTO your_table (column1, column2) VALUES (?, ?)"
insert_parameters = ('value1', 'value2')
insert_result = db_handler.execute(insert_query, insert_parameters)
print("Insert Result:", insert_result)

# Example 4: Update query
update_query = "UPDATE your_table SET column1 = ? WHERE column2 = ?"
update_parameters = ('new_value', 'condition_value')
update_result = db_handler.execute(update_query, update_parameters)
print("Update Result:", update_result)

# Example 5: Delete query
delete_query = "DELETE FROM your_table WHERE column = ?"
delete_parameters = ('value_to_delete',)
delete_result = db_handler.execute(delete_query, delete_parameters)
print("Delete Result:", delete_result)
"""

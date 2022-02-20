BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[TBL_CORE_USERS] ADD [refreshToken] VARCHAR(100);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH